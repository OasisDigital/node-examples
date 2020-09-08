import 'reflect-metadata'; // required for typeorm decorators
import { Connection, createConnection } from 'typeorm';

import { HealthCheckResult } from './health-check-result.entity';
import { HealthCheckResultRepository } from './health-check-result.repository';

export class DatabaseSession {
  readonly healthCheckResultRepository: HealthCheckResultRepository;

  constructor(private readonly connection: Connection) {
    this.healthCheckResultRepository = new HealthCheckResultRepository(
      connection.manager
    );
  }

  disconnect(): void {
    this.connection.close();
  }
}

export async function connect(): Promise<DatabaseSession> {
  const connection = await createConnection({
    type: 'sqlite',
    database: 'database.api-monitoring',
    entities: [HealthCheckResult],
    synchronize: true
  });
  return new DatabaseSession(connection);
}
