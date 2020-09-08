import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { CreateOrderItemDto } from '../src/orders/dto';
import { Order } from '../src/orders/order.entity';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  const orderItems: CreateOrderItemDto[] = [
    { donutId: 1, quantity: 2 },
    { donutId: 2, quantity: 4 },
  ];

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.init();
    server = app.getHttpServer();
  });

  describe('logged in as non-admin', () => {
    let authHeader: { Authorization: string };
    let newOrderId: number;

    beforeAll(async () => {
      const response = await request(server)
        .post('/auth/login')
        .send({ username: 'kyle', password: 'hunter2' });

      authHeader = {
        Authorization: 'Bearer ' + response.body.access_token,
      };
    });

    it('can create an order', async () => {
      const response = await request(server)
        .post('/orders')
        .send({ customerId: 1, orderItems })
        .set(authHeader)
        .expect(201);

      newOrderId = response.body.id;
    });

    it('can retrieve an order', async () => {
      const response = await request(server)
        .get(`/orders/${newOrderId}`)
        .set(authHeader)
        .expect(200);

      const order: Order = response.body;
      expect(order.id).toBe(newOrderId);
      expect(order.customer.id).toBe(1);
      expect(order.orderItems.length).toBe(2);
    });

    it('can list all the orders', async () => {
      const response = await request(server)
        .get('/orders')
        .set(authHeader)
        .expect(200);

      const orders: Order[] = response.body;
      expect(orders.length).toBe(5);
      expect(orders.find((o) => o.id === newOrderId)).toBeDefined();
    });

    it('can get all order items containing a given donut', async () => {
      const response = await request(server)
        .get('/orders/donut/3')
        .set(authHeader)
        .expect(200);

      const orders: Order[] = response.body;
      expect(orders.length).toBe(2);
      expect(
        orders[0].orderItems.every((item) => item.donut.id === 3)
      ).toBe(true);
    });

    it('can get all full orders containing a given donut', async () => {
      const response = await request(server)
        .get('/orders/donut/3?showAll=true')
        .set(authHeader)
        .expect(200);

      const orders: Order[] = response.body;
      expect(orders.length).toBe(2);

      expect(
        orders[0].orderItems.every((item) => item.donut.id === 3)
      ).toBe(false);

      expect(
        orders[0].orderItems.some((item) => item.donut.id === 3)
      ).toBe(true);
    });

    it('cannot delete an order', async () => {
      await request(server)
        .delete(`/orders/${newOrderId}`)
        .set(authHeader)
        .expect(403);
    });
  });

  describe('logged in as admin', () => {
    let authHeader: { Authorization: string };
    let orderToDelete: number;

    beforeAll(async () => {
      const response = await request(server)
        .post('/auth/login')
        .send({ username: 'john', password: 'hunter2' });

      authHeader = {
        Authorization: 'Bearer ' + response.body.access_token,
      };
    });

    it('can list all the orders', async () => {
      const response = await request(server)
        .get('/orders')
        .set(authHeader)
        .expect(200);

      const orders: Order[] = response.body;
      expect(orders.length).toBe(5);
      if (!orders[0].id) {
        throw new Error('Missing order id');
      }
      orderToDelete = orders[0].id;
    });

    it('can delete an order', async () => {
      await request(server)
        .delete(`/orders/${orderToDelete}`)
        .set(authHeader)
        .expect(200);
    });

    it('verifies the order was removed', async () => {
      const response = await request(server)
        .get('/orders')
        .set(authHeader)
        .expect(200);

      const orders: Order[] = response.body;
      expect(orders.length).toBe(4);
      expect(
        orders.find((o) => o.id === orderToDelete)
      ).toBeUndefined();
    });
  });

  describe('not logged in', () => {
    it('cannot create an order', (done) => {
      request(server)
        .post('/orders')
        .send({ customerId: 1, orderItems })
        .expect(401, done);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
