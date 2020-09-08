import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HealthCheckResult {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  url: string;

  @Column()
  status: number;

  @Column()
  statusText: string;

  @Column()
  timeStamp: Date;

  constructor(
    url: string,
    status: number,
    statusText: string,
    timeStamp: Date
  ) {
    this.url = url;
    this.status = status;
    this.statusText = statusText;
    this.timeStamp = timeStamp;
  }
}
