import { FavoriteSite } from './favorite-site';

class FavoritesRepository {
  private favoritesByCategory = new Map<string, FavoriteSite>();

  getAll() {
    return Array.from(this.favoritesByCategory);
  }

  getByCategory(category: string) {
    return this.favoritesByCategory.get(category);
  }

  addFavorite(category: string, site: FavoriteSite) {
    site.dateFavored = new Date();
    this.favoritesByCategory.set(category, site);
  }

  removeCategory(category: string) {
    this.favoritesByCategory.delete(category);
  }
}

export const favoritesRepository = new FavoritesRepository();
