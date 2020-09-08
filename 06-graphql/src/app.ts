import express, { NextFunction, Request, Response } from 'express';
import { postgraphile } from 'postgraphile';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (_req: Request, res: Response) => {
  res.send('Server is listening');
});

const db = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost/${process.env.POSTGRES_DATABASE}`;

app.use(
  postgraphile(db, 'forum_example', {
    graphqlRoute: '/graphql',
    graphiql: true,
    graphiqlRoute: '/graphiql',
    enhanceGraphiql: true,
    allowExplain: () => process.env.NODE_ENV !== 'production',
  })
);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  }
);

export default app;
