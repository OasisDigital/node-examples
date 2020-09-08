import axios from 'axios';
import { from } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';

import { HealthCheckResult } from './health-check-result.entity';
import { HealthCheckResultRepository } from './health-check-result.repository';

export async function healthCheck(
  url: string,
  resultRepository: HealthCheckResultRepository
): Promise<HealthCheckResult> {
  let resultEntity: HealthCheckResult;
  try {
    console.log('Checking:', url);
    // Use axios to make an http request to the URL
    const result = await axios({
      method: 'get',
      url,
      responseType: 'text',
    });
    // Construct a TypeORM entity for the results, that can be saved to the database
    resultEntity = new HealthCheckResult(
      url,
      result.status,
      result.statusText,
      new Date()
    );
  } catch (error) {
    resultEntity = new HealthCheckResult(
      url,
      -1, // We errored out at a lower level, so we don't have an http status code
      error.message,
      new Date()
    );
  }

  try {
    // Save the result to the database, will generate and set primary key
    resultEntity = await resultRepository.save(resultEntity);
  } catch (e) {
    console.error('Result could not be persisted', e);
  }
  console.log('Result:', resultEntity);

  return resultEntity;
}

// Uses RXJS for controlled concurrency
export function runHealthChecks_withLimitedConcurrency(
  apiList: string[],
  resultRepository: HealthCheckResultRepository,
  maxConcurrentRequests = 2
): Promise<HealthCheckResult[]> {
  return from(apiList)
    .pipe(
      // control number of concurrent requests with mergeMap
      mergeMap(
        (url) => healthCheck(url, resultRepository),
        maxConcurrentRequests
      ),
      // accumulate the results so that promise return all results in an array
      scan(
        (acc: HealthCheckResult[], result: HealthCheckResult) =>
          acc.concat(result),
        []
      )
    )
    .toPromise();
}

// Alternative implementation using only Promises, all concurrent
export function runHealthChecks_withFullConcurrency(
  apiList: string[],
  resultRepository: HealthCheckResultRepository
): Promise<HealthCheckResult[]> {
  // will fire all requests at once and then wait for them all to complete
  return Promise.all(
    apiList.map((url) => healthCheck(url, resultRepository))
  );
}

// Alternative implementation using only async-await, no concurrency
export async function runHealthChecks_withNoConcurrency(
  apiList: string[],
  resultRepository: HealthCheckResultRepository
): Promise<HealthCheckResult[]> {
  const results: HealthCheckResult[] = [];
  for (const url of apiList) {
    // will wait for each request to finish before looping to the next one
    const result = await healthCheck(url, resultRepository);
    results.push(result);
  }
  return results;
}
