import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    // What would happen if we reset the database here?
    app = await NestFactory.create(AppModule);
    await app.init();
    server = app.getHttpServer();
  });

  it('can login', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({ username: 'john', password: 'hunter2' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token');
  });

  it('rejects bad credentials', (done) => {
    // The supertest API is old-fashioned Node, but a pattern you'll see in the ecosystem
    request(server)
      .post('/auth/login')
      .send({ username: 'john', password: 'notmypassword' })
      .expect(401, done);
  });

  afterAll(async () => {
    await app.close();
  });
});
