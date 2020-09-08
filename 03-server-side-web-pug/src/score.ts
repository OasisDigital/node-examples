import { Application, Request, Response } from 'express';
import { cardFromId, evaluateHand } from 'sample-lib-playing-cards';

export function registerScoreRoutes(app: Application): void {
  app.get('/score', (req: Request, res: Response) => {
    // req.query looks like:
    // { 'card-5-2': 'on', 'card-5-3': 'on', 'card-9-1': 'on' }
    const hand = Object.keys(req.query).map((id) => cardFromId(id));

    let handCategory: any;
    try {
      const ph = evaluateHand(hand);
      handCategory = ph.display;
    } catch (err) {
      handCategory = err;
    }

    res.render('score', { hand, handCategory });
  });
}
