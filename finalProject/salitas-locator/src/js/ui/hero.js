export const hero = {
  render() {
    const heroEl = document.createElement('section');
    heroEl.classList.add('hero');

    heroEl.innerHTML = `
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Tu Salita</h1>
            <p class="hero-subtitle">Encuentra el centro de salud más cercano a tu ubicación</p>
            <p class="hero-description">Conectamos a turistas, residentes y visitantes con la atención médica que necesitan, facilitando el acceso a la salud en la ciudad de San Rafael y alrededores.</p>
            <div class="hero-buttons">
              <button class="btn btn-primary" onclick="document.getElementById('centros').scrollIntoView({behavior: 'smooth'})">
                Buscar Centros
              </button>
              <button class="btn btn-secondary" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})">
                Conocer Más
              </button>
            </div>
          </div>
          <div class="hero-image">
            <img src="/hero/hero-image.webp" alt="Centros de salud en Mendoza" loading="lazy" />
          </div>
        </div>
      </div>
    `;

    return heroEl;
  }
};
