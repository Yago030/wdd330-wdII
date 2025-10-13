export const header = {
  render() {
    const headerEl = document.createElement('header');
    const overlayEl = document.createElement('div');

    overlayEl.id = 'overlay';
    document.body.appendChild(overlayEl);

    headerEl.innerHTML = `
        <div class="profile">
          <div class="header-container">
            <div class="header-logo">
              <svg class="header-logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6"></path>
                <path d="M12 17v6"></path>
                <path d="M4.22 4.22l4.24 4.24"></path>
                <path d="M15.54 15.54l4.24 4.24"></path>
                <path d="M1 12h6"></path>
                <path d="M17 12h6"></path>
                <path d="M4.22 19.78l4.24-4.24"></path>
                <path d="M15.54 8.46l4.24-4.24"></path>
              </svg>
            </div>
            <span class="header-title">Tu Salita</span>
          </div>
          <button id="menuButton" class="menu-button">&#9776;</button>
        </div>

        <nav id="mainNav">
          <a href="#inicio">Inicio</a>
          <a href="#about">Nosotros</a>
          <a href="#mapa">Mapa</a>
          <a href="#centros">Centros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      `;

    const menu = headerEl.querySelector('#mainNav');
    const overlay = document.getElementById('overlay');
    const button = headerEl.querySelector('#menuButton');

    button.addEventListener('click', () => {
      menu.classList.add('open');
      overlay.classList.add('visible');
    });

    overlay.addEventListener('click', () => {
      menu.classList.remove('open');
      overlay.classList.remove('visible');
    });

    return headerEl;
  },
};
