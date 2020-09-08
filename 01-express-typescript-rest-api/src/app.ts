import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';

// Route Handlers
import { registerFavoritesRoutes } from './favorites/routes';
import { registerPageAnalysisRoutes } from './page-analysis/routes';

// Create server
const app = express();

// Configure middleware
app.use(bodyParser.json());

// Register routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Server is listening\n');
});
registerPageAnalysisRoutes(app);
registerFavoritesRoutes(app);

// Add a custom error handler
// NOTE: You must list all parameters shown for express to recognize it as an errorHandler
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  }
);

export default app;
