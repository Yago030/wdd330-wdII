export const contact = {
  render() {
    const contactEl = document.createElement('section');

    contactEl.classList.add('contact-container');
    contactEl.id = 'contact';

    contactEl.innerHTML = `
      <div class="contact-wrapper">
        <div class="contact-header">
          <h2 class="contact-title">Contáctanos</h2>
          <p class="contact-subtitle">¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!</p>
        </div>
        
        <div class="contact-form-container">
          <form class="contact-form" id="contactForm">
            <div class="form-row">
              <div class="form-group">
                <div class="input-wrapper">
                  <input type="text" id="name" name="name" required>
                  <label for="name" class="floating-label">Nombre completo</label>
                  <div class="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <div class="input-wrapper">
                  <input type="email" id="email" name="email" required>
                  <label for="email" class="floating-label">Correo electrónico</label>
                  <div class="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-wrapper">
                <input type="text" id="subject" name="subject" required>
                <label for="subject" class="floating-label">Asunto</label>
                <div class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-wrapper textarea-wrapper">
                <textarea id="message" name="message" rows="5" required></textarea>
                <label for="message" class="floating-label">Mensaje</label>
                <div class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <button type="submit" class="contact-submit">
              <span>Enviar mensaje</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;

    // Agregar event listener para el formulario
    contactEl.addEventListener('submit', this.handleSubmit);

    return contactEl;
  },

  handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Aquí podrías enviar los datos a un servidor
    console.log('Datos del formulario:', data);
    
    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
    
    // Limpiar el formulario
    event.target.reset();
  }
};
