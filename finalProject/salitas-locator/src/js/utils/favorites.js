import { config } from '../config/env.js';

export const favoritesManager = {
  storageKey: config.favoritesStorageKey,

  getFavorites() {
    try {
      const favorites = localStorage.getItem(this.storageKey);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error obteniendo favoritos:', error);
      return [];
    }
  },

  saveFavorites(favorites) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error guardando favoritos:', error);
      return false;
    }
  },

  addToFavorites(centroId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(centroId)) {
      favorites.push(centroId);
      this.saveFavorites(favorites);
      this.updateFavoritesUI();
      return true;
    }
    return false;
  },

  removeFromFavorites(centroId) {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(centroId);
    if (index > -1) {
      favorites.splice(index, 1);
      this.saveFavorites(favorites);
      this.updateFavoritesUI();
      return true;
    }
    return false;
  },

  isFavorite(centroId) {
    const favorites = this.getFavorites();
    return favorites.includes(centroId);
  },

  toggleFavorite(centroId) {
    if (this.isFavorite(centroId)) {
      return this.removeFromFavorites(centroId);
    } else {
      return this.addToFavorites(centroId);
    }
  },

  getFavoritesCount() {
    return this.getFavorites().length;
  },

  updateFavoritesUI() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      const centroId = parseInt(btn.getAttribute('data-centro-id'));
      const isFav = this.isFavorite(centroId);
      
      btn.classList.toggle('favorited', isFav);
      btn.innerHTML = isFav ? 
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' :
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    });

    const favoritesCounter = document.getElementById('favorites-counter');
    const favoritesCount = document.getElementById('favorites-count');
    if (favoritesCounter && favoritesCount) {
      const count = this.getFavoritesCount();
      favoritesCount.textContent = count;
      favoritesCounter.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  async getFavoriteCentros() {
    const favoriteIds = this.getFavorites();
    if (favoriteIds.length === 0) return [];

    try {
      const response = await fetch('/centros.json');
      const data = await response.json();
      return data.centros.filter(centro => favoriteIds.includes(centro.id));
    } catch (error) {
      console.error('Error obteniendo centros favoritos:', error);
      return [];
    }
  }
};
