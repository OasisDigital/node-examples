import request from 'supertest';

import app from '../src/app';

describe('application', () => {
  it('should return server listening', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
  });

  it('404s on a random URL', async () => {
    const response = await request(app).get('/reset');
    expect(response.status).toEqual(404);
  });

  it('can score a hand', async () => {
    const resp = await request(app).get(
      '/score?card-0-2=on&card-4-2=on&card-5-0=on&card-6-0=on&card-9-2=on'
    );

    expect(resp.status).toEqual(200);
    expect(resp.text).toContain('High Card');
  });
});
