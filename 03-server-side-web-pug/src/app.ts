import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';

import { registerHomeRoutes } from './home';
import { registerScoreRoutes } from './score';

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'pug');

registerHomeRoutes(app);
registerScoreRoutes(app);

// Error handling
app.use(
  // List all parameters shown for express to recognize it as an errorHandler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error details', err);
    res.status(500).send('Internal Server Error');
  }
);

export default app;
