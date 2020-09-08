import { Application, Request, Response } from 'express';
import { Card, Deck } from 'sample-lib-playing-cards';

function cardSvg(c: Card): string {
  return `card-images/${c.rankDisplay}_of_${c.suitDisplay}.svg`.toLowerCase();
}

export function registerHomeRoutes(app: Application): void {
  app.get('/', (_req: Request, res: Response) => {
    const d = new Deck();
    res.render('index', { deck: d.cards, cardSvg });
  });
}
