import fs from 'fs';

import { connect, DatabaseSession } from './database';
import {
  runHealthChecks_withFullConcurrency,
  runHealthChecks_withLimitedConcurrency,
  runHealthChecks_withNoConcurrency,
} from './health-check';
import { HealthCheckResult } from './health-check-result.entity';

export async function listResults(): Promise<HealthCheckResult[]> {
  const db: DatabaseSession = await connect();
  try {
    const allResults: HealthCheckResult[] = await db.healthCheckResultRepository.findAll();
    allResults.forEach((r) => console.log(r));
    return allResults;
  } finally {
    db.disconnect();
  }
}

export async function monitor(
  filePath: string,
  concurrencyType = 'limited',
  concurrencyLimit?: number
): Promise<HealthCheckResult[]> {
  const rawData: Buffer = await fs.promises.readFile(filePath);
  const apiList: string[] = JSON.parse(rawData.toString());

  const db: DatabaseSession = await connect();
  let result: HealthCheckResult[];
  try {
    switch (concurrencyType) {
      case 'single':
        result = await runHealthChecks_withNoConcurrency(
          apiList,
          db.healthCheckResultRepository
        );
        break;
      case 'all':
        result = await runHealthChecks_withFullConcurrency(
          apiList,
          db.healthCheckResultRepository
        );
        break;
      default:
        result = await runHealthChecks_withLimitedConcurrency(
          apiList,
          db.healthCheckResultRepository,
          concurrencyLimit
        );
    }
  } finally {
    db.disconnect();
  }
  return result;
}
