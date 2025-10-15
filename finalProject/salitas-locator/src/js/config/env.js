export const config = {
  openRouteApiKey: import.meta.env.VITE_OPENROUTE_API_KEY,
  
  appName: import.meta.env.VITE_APP_NAME || 'Tu Salita',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  openRouteBaseUrl: 'https://api.openrouteservice.org/v2/directions',
  
  favoritesStorageKey: 'salitas-favoritos',
  
  defaultMapCenter: [-34.6, -68.3], 
  defaultMapZoom: 11
};

export const validateConfig = () => {
  const errors = [];
  
  if (!config.openRouteApiKey) {
    errors.push('VITE_OPENROUTE_API_KEY no está configurada');
    console.error('API Key de OpenRouteService no encontrada');
    console.warn('Configura la variable de entorno VITE_OPENROUTE_API_KEY');
  }
  
  if (errors.length > 0) {
    console.warn('Configuración incompleta:', errors);
  }
  
  return errors.length === 0;
};

validateConfig();
