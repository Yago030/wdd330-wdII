import { config } from '../config/env.js';

export const map = {
  mapInstance: null,
  markers: [],

  async render() {
    const mapEl = document.createElement('section');
    mapEl.classList.add('map-section');
    mapEl.id = 'mapa';

    mapEl.innerHTML = `
      <div class="container">
        <div class="map-header">
          <h2 class="map-title">Mapa de Centros de Salud</h2>
          <p class="map-subtitle">Explora la ubicación de todos los centros de salud en San Rafael</p>
        </div>
        <div class="map-container">
          <div id="map" class="map"></div>
          <div class="map-controls">
            <button id="locateBtn" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
              </svg>
              Mi Ubicación
            </button>
            <button id="resetViewBtn" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M21 12a9 9 0 1 1-9 9 9.75 9.75 0 0 1 6.74-2.74L21 16"></path>
                <path d="M16 16h5v5"></path>
              </svg>
              Vista General
            </button>
          </div>
        </div>
      </div>
    `;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.initMap(), 100);
      });
    } else {
      setTimeout(() => this.initMap(), 100);
    }

    window.scrollToCentro = (centroId) => {
      this.mapInstance.closePopup();
      
      const centrosSection = document.getElementById('centros');
      if (centrosSection) {
        centrosSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          const centroCard = document.querySelector(`[data-centro-id="${centroId}"]`);
          if (centroCard) {
            centroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            centroCard.classList.add('highlighted');
            setTimeout(() => {
              centroCard.classList.remove('highlighted');
            }, 3000);
          }
        }, 500);
      }
    };

    return mapEl;
  },

  async initMap() {
    if (typeof L === 'undefined') {
      console.error('Leaflet no está cargado');
      return;
    }

    // Verificar que el contenedor del mapa existe
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Contenedor del mapa no encontrado');
      return;
    }

    const sanRafaelCoords = config.defaultMapCenter;
    
    this.mapInstance = L.map('map').setView(sanRafaelCoords, config.defaultMapZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.mapInstance);

    await this.loadCentros();

    this.setupControls();
  },

  async loadCentros() {
    try {
      const response = await fetch('/centros.json');
      const data = await response.json();
      
      this.clearMarkers();

      data.centros.forEach(centro => {
        if (centro.coordenadas && centro.coordenadas.lat && centro.coordenadas.lng) {
          this.addMarker(centro);
        }
      });

      if (this.markers.length > 0) {
        const group = new L.featureGroup(this.markers);
        this.mapInstance.fitBounds(group.getBounds().pad(0.1));
      }
    } catch (error) {
      console.error('Error cargando centros:', error);
    }
  },

  addMarker(centro) {
    const healthIcon = L.divIcon({
      className: 'health-marker',
      html: `
        <div class="marker-container">
          <div class="marker-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const marker = L.marker([centro.coordenadas.lat, centro.coordenadas.lng], {
      icon: healthIcon
    }).addTo(this.mapInstance);

    const popupContent = `
      <div class="map-popup">
        <h3>${centro.efector}</h3>
        <p><strong>Localidad:</strong> ${centro.localidad}</p>
        <p><strong>Dirección:</strong> ${centro.domicilio}</p>
        <p><strong>Teléfono:</strong> ${centro.telefono}</p>
        ${centro.farmacia ? '<p><span class="badge">Farmacia</span></p>' : ''}
        ${centro.laboratorio ? '<p><span class="badge">Laboratorio</span></p>' : ''}
        <div class="popup-actions">
          <button class="btn btn-primary btn-sm" onclick="window.scrollToCentro(${centro.id})">
            Ver más detalles
          </button>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    this.markers.push(marker);
  },

  clearMarkers() {
    this.markers.forEach(marker => {
      this.mapInstance.removeLayer(marker);
    });
    this.markers = [];
  },

  setupControls() {
    const locateBtn = document.getElementById('locateBtn');
    if (locateBtn) {
      locateBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude;
              const userLng = position.coords.longitude;
              
              this.mapInstance.setView([userLat, userLng], 15);
              
              L.marker([userLat, userLng])
                .addTo(this.mapInstance)
                .bindPopup('Tu ubicación actual')
                .openPopup();
            },
            (error) => {
              console.error('Error obteniendo ubicación:', error);
              alert('No se pudo obtener tu ubicación');
            }
          );
        } else {
          alert('Tu navegador no soporta geolocalización');
        }
      });
    }

    const resetViewBtn = document.getElementById('resetViewBtn');
    if (resetViewBtn) {
      resetViewBtn.addEventListener('click', () => {
        if (this.markers.length > 0) {
          const group = new L.featureGroup(this.markers);
          this.mapInstance.fitBounds(group.getBounds().pad(0.1));
        } else {
          this.mapInstance.setView(config.defaultMapCenter, config.defaultMapZoom);
        }
      });
    }
  }
};
