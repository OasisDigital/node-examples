import axios, { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import {
  healthCheck,
  runHealthChecks_withNoConcurrency,
} from './health-check';
import { HealthCheckResult } from './health-check-result.entity';
import { HealthCheckResultRepository } from './health-check-result.repository';

jest.mock('axios');
jest.mock('./health-check-result.repository');

describe('', () => {
  let repository: HealthCheckResultRepository;

  beforeEach(() => {
    // repository is actually a jest mock
    repository = new HealthCheckResultRepository(null as any);
  });

  describe('healthCheck function', () => {
    it('should return OK', async () => {
      // Set up our mock implementations:
      // (the mocked function allows us to access the mock API
      // of a mocked function while keeping typescript happy)
      mocked(repository.save).mockImplementation(async (result) => {
        // The real implementation would generate a new primary key,
        // insert row in database table, and then return the entity
        // with the new primary key set.
        result.id = 1;
        return result;
      });
      mocked(axios).mockImplementation(
        async () =>
          ({
            status: 200,
            statusText: 'OK',
          } as AxiosResponse)
      );

      // Invoke the function we are testing:
      const url = 'http://www.google.com';
      const result: HealthCheckResult = await healthCheck(
        url,
        repository
      );

      // Verify the results
      const expectedResult = new HealthCheckResult(
        url,
        200,
        'OK',
        result.timeStamp
      );
      expectedResult.id = 1;
      expect(result).toEqual(expectedResult);
    });
  });

  describe('runHealthChecks_withNoConcurrency function', () => {
    let nextId: number;

    beforeEach(() => {
      nextId = 1;

      mocked(repository.save).mockImplementation(async (result) => {
        result.id = nextId++;
        return result;
      });
    });

    it('should test all urls', async () => {
      mocked(axios).mockImplementation(
        async () =>
          ({
            status: 200,
            statusText: 'OK',
          } as AxiosResponse)
      );

      const apiList = [
        'http://www.google.com',
        'http://www.cnn.com',
        'http://www.yahoo.com',
      ];
      const results = await runHealthChecks_withNoConcurrency(
        apiList,
        repository
      );

      expect(results.length).toEqual(3);
      expect(results.map((r) => r.url)).toEqual(apiList);
      expect(results.map((r) => r.status)).toEqual([200, 200, 200]);
    });
  });
});
