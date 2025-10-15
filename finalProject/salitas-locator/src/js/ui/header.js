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
            <div class="favorites-counter" id="favorites-counter" style="display: none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span id="favorites-count">0</span>
            </div>
          </div>
          <button id="menuButton" class="menu-button">&#9776;</button>
        </div>

        <nav id="mainNav">
          <a href="#inicio">Inicio</a>
          <a href="#about">Nosotros</a>
          <a href="#mapa">Mapa</a>
          <a href="#centros">Centros</a>
          <a href="#contact">Contacto</a>
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

    const navLinks = headerEl.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        menu.classList.remove('open');
        overlay.classList.remove('visible');
        
        if (targetId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    return headerEl;
  },
};
