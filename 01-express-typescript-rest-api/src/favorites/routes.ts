import { Application, Request, Response } from 'express';

import { FavoriteSite } from './favorite-site';
import { favoritesRepository } from './favorites-repository';

export function registerFavoritesRoutes(app: Application): void {
  app.get('/favorites', (_req: Request, res: Response) => {
    res.set('Cache-Control', 'no-store');
    res.send(favoritesRepository.getAll());
  });

  app.put('/favorites', (req: Request, res: Response) => {
    const site: FavoriteSite = req.body;
    const category: string =
      (req.query.category as string) || 'default';
    favoritesRepository.addFavorite(category, site);
    res.set('Cache-Control', 'no-store');
    res.send(favoritesRepository.getByCategory(category));
  });

  app.get('/favorites/:category', (req: Request, res: Response) => {
    const category: string = req.params.category as string;
    res.set('Cache-Control', 'no-store');
    res.send(favoritesRepository.getByCategory(category));
  });

  app.delete(
    '/favorites/:category',
    (req: Request, res: Response) => {
      const category: string = req.params.category as string;
      favoritesRepository.removeCategory(category);
      res.status(204).send();
    }
  );
}
