// src/js/ui/header.js
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
              <span class="header-logo-text">TS</span>
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
