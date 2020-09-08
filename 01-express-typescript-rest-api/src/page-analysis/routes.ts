import { Application, Request, Response } from 'express';

import { countWord } from './count-word';

export function registerPageAnalysisRoutes(app: Application): void {
  app.get('/word', async (req: Request, res: Response) => {
    try {
      const url = 'https://www.yahoo.com/';
      const word = (req.query.word as string) || 'sports';
      const n = await countWord(url, word);

      // This data changes slowly, so lets browsers and caches store it:
      res.header('Cache-Control: public, max-age=60');
      res.send({ n });
    } catch (e) {
      // Must call next() so that registered error handlers
      // can send back an error response
      if (req.next) {
        req.next(e);
      }

      // or explicitly send back an error response
      // res.status(500).send('An error occurred');
    }
  });

  app.get('/word/most', async (req: Request, res: Response) => {
    try {
      const url1 = 'https://www.yahoo.com/';
      const url2 = 'https://news.google.com/';
      const word = (req.query.word as string) || 'sports';

      // Use Promise.all for simple concurrency
      const counts = await Promise.all([
        countWord(url1, word),
        countWord(url2, word),
      ]);
      const mostMentionedOn = counts[0] >= counts[1] ? url1 : url2;

      res.header('Cache-Control: public, max-age=60');
      res.send(mostMentionedOn);
    } catch (e) {
      if (req.next) {
        req.next(e);
      }
    }
  });
}
