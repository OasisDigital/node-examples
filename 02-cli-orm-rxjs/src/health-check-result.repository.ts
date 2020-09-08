import { EntityManager } from 'typeorm';

import { HealthCheckResult } from './health-check-result.entity';

export class HealthCheckResultRepository {
  constructor(private manager: EntityManager) {}

  save(
    healthCheckResult: HealthCheckResult
  ): Promise<HealthCheckResult> {
    return this.manager.save<HealthCheckResult>(healthCheckResult);
  }

  findAll(): Promise<HealthCheckResult[]> {
    return this.manager.find(HealthCheckResult, {
      order: { url: 'ASC', timeStamp: 'ASC' },
    });
  }
}
