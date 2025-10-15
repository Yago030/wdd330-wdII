import { config } from '../config/env.js';

export const routingService = {
  apiKey: config.openRouteApiKey,
  baseUrl: config.openRouteBaseUrl,

  async getRoute(startCoords, endCoords, profile = 'driving-car') {
    try {
      const url = `${this.baseUrl}/${profile}/geojson`;
      
      const requestBody = {
        coordinates: [startCoords, endCoords],
        format: 'geojson',
        options: {
          avoid_features: ['highways', 'tollways'],
          avoid_borders: 'controlled'
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const data = await response.json();
      return this.processRouteData(data);
    } catch (error) {
      console.error('Error obteniendo ruta:', error);
      return null;
    }
  },

  processRouteData(data) {
    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature = data.features[0];
    const properties = feature.properties;
    const geometry = feature.geometry;

    return {
      distance: properties.summary.distance, 
      duration: properties.summary.duration, 
      coordinates: geometry.coordinates,
      instructions: properties.segments ? this.extractInstructions(properties.segments) : []
    };
  },

  extractInstructions(segments) {
    const instructions = [];
    segments.forEach(segment => {
      if (segment.steps) {
        segment.steps.forEach(step => {
          instructions.push({
            instruction: step.instruction,
            distance: step.distance,
            duration: step.duration,
            type: step.type
          });
        });
      }
    });
    return instructions;
  },

  formatDistance(meters) {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    } else {
      return `${(meters / 1000).toFixed(1)} km`;
    }
  },

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes} min`;
    }
  },

  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 
        }
      );
    });
  },

  showRouteModal(route, centroName) {
    const modal = document.createElement('div');
    modal.className = 'route-modal-overlay';
    modal.innerHTML = `
      <div class="route-modal">
        <div class="route-modal-header">
          <h3>Ruta a ${centroName}</h3>
          <button class="route-modal-close">&times;</button>
        </div>
        <div class="route-modal-body">
          <div class="route-summary">
            <div class="route-info">
              <div class="route-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${this.formatDistance(route.distance)}</span>
              </div>
              <div class="route-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>${this.formatDuration(route.duration)}</span>
              </div>
            </div>
            <div class="route-actions">
              <button class="btn btn-primary" onclick="window.openInMaps(${route.coordinates[0][1]}, ${route.coordinates[0][0]}, ${route.coordinates[route.coordinates.length-1][1]}, ${route.coordinates[route.coordinates.length-1][0]})">
                Abrir en Maps
              </button>
            </div>
          </div>
          ${route.instructions.length > 0 ? `
            <div class="route-instructions">
              <h4>Instrucciones:</h4>
              <ol class="instructions-list">
                ${route.instructions.slice(0, 10).map(instruction => `
                  <li>${instruction.instruction}</li>
                `).join('')}
              </ol>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.route-modal-close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    window.openInMaps = (startLat, startLng, endLat, endLng) => {
      const googleMapsUrl = `https://www.google.com/maps/dir/${startLat},${startLng}/${endLat},${endLng}`;
      window.open(googleMapsUrl, '_blank');
    };
  },

  async getRouteToCentro(centro) {
    try {
      const loadingModal = this.showLoadingModal();
      
      const userLocation = await this.getUserLocation();
      
      const route = await this.getRoute(
        [userLocation.lng, userLocation.lat],
        [centro.coordenadas.lng, centro.coordenadas.lat]
      );

      // Remover loading
      if (loadingModal) {
        document.body.removeChild(loadingModal);
      }

      if (route) {
        this.showRouteModal(route, centro.efector);
      } else {
        this.showErrorModal('No se pudo calcular la ruta');
      }
    } catch (error) {
      console.error('Error obteniendo ruta:', error);
      this.showErrorModal('Error obteniendo tu ubicación o calculando la ruta');
    }
  },

  showLoadingModal() {
    const modal = document.createElement('div');
    modal.className = 'route-modal-overlay';
    modal.innerHTML = `
      <div class="route-modal loading">
        <div class="loading-spinner"></div>
        <p>Calculando ruta...</p>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  },

  showErrorModal(message) {
    const modal = document.createElement('div');
    modal.className = 'route-modal-overlay';
    modal.innerHTML = `
      <div class="route-modal error">
        <div class="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>${message}</p>
        <button class="btn btn-primary" onclick="this.closest('.route-modal-overlay').remove()">
          Cerrar
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }
};
