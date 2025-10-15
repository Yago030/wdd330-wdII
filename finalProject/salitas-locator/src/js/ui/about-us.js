

export const aboutUs  = {
  render() {
    const aboutUsEl = document.createElement('about-us');

    aboutUsEl.classList.add('about-us-container');

    aboutUsEl.innerHTML = `
        <section class="about-us" id="about">
        <div class="container">
          <div class="about-header">
            <h2 class="about-main-title">Acerca de Tu Salita</h2>
            <p class="about-main-subtitle">Conectamos a las personas con la atención médica que necesitan</p>
          </div>
          <div class="about-content">
            <div class="about-text">
              <h3>¿Qué es "Tu Salita"?</h3>
              <p>Somos una web que conecta a turistas, residentes y visitantes con los centros de salud más cercanos a su ubicación. Nuestro objetivo es facilitar el acceso a la atención médica rápida y de calidad en toda la ciudad de San Rafael.</p>
            </div>
            <div class="about-text">
              <h3>¿Cómo funciona?</h3>
              <p>Utiliza tu ubicación actual o busca por distrito para encontrar la salita más cercana. Obtén información detallada sobre especialidades médicas, horarios de atención, servicios disponibles y direcciones exactas para llegar sin demoras.</p>
            </div>
          </div>
        </div>
      </section>
    `;

    return aboutUsEl;
  }
};
