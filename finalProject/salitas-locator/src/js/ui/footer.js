export const footer = {
    render() {
      const footerEl = document.createElement('footer');
  
      footerEl.classList.add('footer-container');
  
      footerEl.innerHTML = `
        <div class="footer-content">
          <div>
            <h2 class="footer-title">
              Tu Salita
            </h2>
            <p class="footer-subtitle">Centros de salud cerca tuyo</p>
          </div>
  
          <nav class="footer-nav">
            <a href="#about">Proyecto</a>
            <a href="#centros">Centros</a>
            <a href="#contact">Contacto</a>
            <a href="#privacy">Privacidad</a>
          </nav>
        </div>
  
        <p class="footer-copyright">
          © 2025 <span class="author">Santiago Bergerat</span>
        </p>
      `;
  
      return footerEl;
    }
  };
  