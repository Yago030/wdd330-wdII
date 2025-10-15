export const footer = {
  render() {
    const footerEl = document.createElement('footer');
    footerEl.classList.add('footer-container');

    footerEl.innerHTML = `
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <div class="footer-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
            <h3 class="footer-title">Tu Salita</h3>
            <p class="footer-subtitle">Encuentra centros de salud cerca de ti</p>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-section-title">Navegación</h4>
          <nav class="footer-nav">
            <a href="#inicio" class="footer-link">Inicio</a>
            <a href="#about" class="footer-link">Nosotros</a>
            <a href="#mapa" class="footer-link">Mapa</a>
            <a href="#centros" class="footer-link">Centros</a>
            <a href="#contact" class="footer-link">Contacto</a>
          </nav>
        </div>

         <div class="footer-section">
           <h4 class="footer-section-title">Desarrollado por</h4>
           <div class="footer-developer">
             <p class="footer-developer-text">
               Santiago Bergerat
             </p>
             <a href="https://www.linkedin.com/in/santiago-bergerat-797b7b1ba/" target="_blank" rel="noopener noreferrer" class="footer-linkedin">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
               LinkedIn
             </a>
           </div>
         </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
           <p class="footer-copyright">
             © 2025 <span class="author">Santiago Bergerat</span>. Todos los derechos reservados.
           </p>
        </div>
      </div>
    `;

    this.addFooterEventListeners(footerEl);

    return footerEl;
  },

  addFooterEventListeners(footerEl) {
    const footerLinks = footerEl.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
};
  