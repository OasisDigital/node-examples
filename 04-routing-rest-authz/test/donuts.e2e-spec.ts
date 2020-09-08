import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('DonutController (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let newDonutId: number;
  const newDonutName = 'Boston Creme';
  const newDonutDesc = 'Filled';

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.init();
    server = app.getHttpServer();
  });

  it('creates a donut', async () => {
    const resp = await request(server)
      .post('/donuts')
      .send({ name: newDonutName, description: newDonutDesc })
      .expect(201);

    newDonutId = resp.body.id;
  });

  it('gets donut by id', async () => {
    const resp = await request(server)
      .get(`/donuts/${newDonutId}`)
      .expect(200);

    expect(resp.body.name).toBe(newDonutName);
    expect(resp.body.description).toBe(newDonutDesc);
  });

  it('updates a donut', async () => {
    const name = 'Boston Cream';
    const description = 'Filled and Delicious';
    const resp = await request(server)
      .put(`/donuts/${newDonutId}`)
      .send({ name, description })
      .expect(200);

    expect(resp.body.name).toBe(name);
    expect(resp.body.description).toBe(description);
  });

  it('gets a list of donuts', async () => {
    const resp = await request(server).get('/donuts').expect(200);

    expect(resp.body.length).toBe(4);
  });

  afterAll(() => app.close());
});
