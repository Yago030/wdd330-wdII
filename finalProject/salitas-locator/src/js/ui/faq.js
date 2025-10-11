// src/js/ui/faq.js
export const faq = {
    render() {
      const faqEl = document.createElement('section');
      faqEl.classList.add('faq-section');
  
      faqEl.innerHTML = `
        <!-- Título -->
        <div class="faq-title-container">
          <h2 class="faq-title">Preguntas Frecuentes</h2>
          <div class="faq-divider"></div>
        </div>
  
        <!-- Bloques FAQ -->
        <div class="faq-container">
          ${[
            {
              q: '¿Qué es Tu Salita?',
              a: `
                <strong>Tu Salita</strong> es una iniciativa comunitaria creada para ayudar a los vecinos a encontrar
                centros de salud cercanos de forma rápida y accesible. No pertenece al Estado ni a ninguna institución,
                sino que fue desarrollada de manera independiente con el objetivo de acercar la información de salud pública.`
            },
            {
              q: '¿Los datos son oficiales?',
              a: `
                Los datos provienen de fuentes abiertas, registros municipales y aportes de la comunidad.
                Se verifican de forma manual para mantener la precisión. Si ves errores o datos desactualizados,
                podés informarlos desde la sección
                <a href="#contacto" class="faq-link">Contacto</a>.`
            },
            {
              q: '¿Es un proyecto del gobierno?',
              a: `
                No. Es un proyecto independiente y sin fines de lucro. La meta es ofrecer una herramienta simple,
                gratuita y útil para toda la comunidad.`
            },
            {
              q: '¿Puedo colaborar o sugerir mejoras?',
              a: `
                ¡Sí! Este proyecto crece con el aporte de la comunidad. Podés enviar sugerencias, correcciones o ideas nuevas
                desde la sección <a href="#contacto" class="faq-link">Contacto</a>.`
            },
            {
              q: '¿Por qué crearon esta herramienta?',
              a: `
                Nació con la idea de facilitar el acceso a la salud, especialmente para quienes no usan apps complejas.
                Está pensada como una plataforma abierta, inclusiva y de servicio público local.`
            },
            {
              q: '¿Quién desarrolla Tu Salita?',
              a: `
                Fue desarrollada por <strong>Santiago Bergerat</strong> como un proyecto comunitario de software libre,
                orientado a mejorar el acceso a la información sanitaria y fomentar la participación ciudadana.`
            },
            {
              q: '¿Se puede usar desde el celular?',
              a: `
                Sí, toda la plataforma está diseñada con un enfoque responsive y accesible para todos los dispositivos:
                celulares, tablets y computadoras de escritorio.`
            },
            {
              q: '¿Cómo puedo reportar un error o actualizar un centro?',
              a: `
                Si detectás información incorrecta o querés sugerir una actualización,
                podés escribirnos desde la página de <a href="#contacto" class="faq-link">Contacto</a>.
                Las correcciones se revisan manualmente antes de publicarse.`
            }
          ].map(item => `
            <details class="faq-item">
              <summary class="faq-summary">
                <span>${item.q}</span>
                <span class="faq-icon">+</span>
              </summary>
              <div class="faq-content">
                <div class="faq-content-inner">
                  ${item.a}
                </div>
              </div>
            </details>
          `).join('')}
        </div>
      `;
  
      // Agregar funcionalidad de acordeón
      setTimeout(() => {
        const faqItems = faqEl.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
          item.addEventListener('toggle', () => {
            if (item.open) {
              // Cerrar todos los otros FAQ
              faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) {
                  otherItem.open = false;
                }
              });
            }
          });
        });
      }, 0);
  
      return faqEl;
    }
  };
  