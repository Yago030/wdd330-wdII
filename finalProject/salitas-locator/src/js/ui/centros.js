export const centros = {
  currentPage: 1,
  itemsPerPage: 10,
  allCentros: [],

  async render() {
    const centrosEl = document.createElement('section');
    centrosEl.classList.add('centros-section');
    centrosEl.id = 'centros';

    const data = await this.loadCentros();
    this.allCentros = data.centros;
    
    centrosEl.innerHTML = `
      <div class="centros-wrapper">
        <div class="centros-header">
          <h2 class="centros-title">Centros de Salud</h2>
          <p class="centros-subtitle">Encuentra información detallada de cada centro de salud</p>
          <div class="centros-stats">
            <span class="total-centros">Total: ${this.allCentros.length} centros</span>
          </div>
        </div>
        
        <div class="centros-container" id="centros-container">
          ${this.renderCentrosPage()}
        </div>
        
        <div class="pagination-container" id="pagination-container">
          ${this.renderPagination()}
        </div>
      </div>
    `;

    this.addEventListeners(centrosEl);

    return centrosEl;
  },

  async loadCentros() {
    try {
      const response = await fetch('/centros.json');
      return await response.json();
    } catch (error) {
      console.error('Error cargando centros:', error);
      return { centros: [] };
    }
  },

  getCurrentPageCentros() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allCentros.slice(startIndex, endIndex);
  },

  getTotalPages() {
    return Math.ceil(this.allCentros.length / this.itemsPerPage);
  },

  renderCentrosPage() {
    const currentCentros = this.getCurrentPageCentros();
    return currentCentros.map(centro => this.renderCentroCard(centro)).join('');
  },

  renderPagination() {
    const totalPages = this.getTotalPages();
    if (totalPages <= 1) return '';

    let paginationHTML = '<div class="pagination">';
    
    // Botón anterior
    if (this.currentPage > 1) {
      paginationHTML += `<button class="pagination-btn prev-btn" data-page="${this.currentPage - 1}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
        Anterior
      </button>`;
    }

    // Números de página
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);

    if (startPage > 1) {
      paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
      if (startPage > 2) {
        paginationHTML += `<span class="pagination-ellipsis">...</span>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="pagination-ellipsis">...</span>`;
      }
      paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    // Botón siguiente
    if (this.currentPage < totalPages) {
      paginationHTML += `<button class="pagination-btn next-btn" data-page="${this.currentPage + 1}">
        Siguiente
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>`;
    }

    paginationHTML += '</div>';
    return paginationHTML;
  },

  updatePage(page) {
    this.currentPage = page;
    const container = document.getElementById('centros-container');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (container) {
      container.innerHTML = this.renderCentrosPage();
      this.addSpecialtyAccordion(container);
    }
    
    if (paginationContainer) {
      paginationContainer.innerHTML = this.renderPagination();
      this.addPaginationListeners();
    }
    
    // Scroll suave hacia la sección de centros
    this.scrollToCentrosSection();
  },

  scrollToCentrosSection() {
    // Pequeño delay para asegurar que el contenido se haya renderizado
    setTimeout(() => {
      const centrosSection = document.getElementById('centros');
      if (centrosSection) {
        centrosSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  },

  addEventListeners(element) {
    this.addSpecialtyAccordion(element);
    this.addPaginationListeners();
  },

  addPaginationListeners() {
    setTimeout(() => {
      const paginationBtns = document.querySelectorAll('.pagination-btn');
      paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const page = parseInt(btn.getAttribute('data-page'));
          this.updatePage(page);
        });
      });
    }, 0);
  },

  renderCentroCard(centro) {
    return `
      <div class="centro-card compact" data-centro-id="${centro.id}">
        <div class="centro-header">
          <div class="centro-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18"></path>
              <path d="M5 21V7l8-4v18"></path>
              <path d="M19 21V11l-6-4"></path>
            </svg>
          </div>
          <div class="centro-info">
            <h3 class="centro-name">${centro.efector}</h3>
            <p class="centro-location">${centro.localidad}</p>
          </div>
        </div>

        <div class="centro-actions">
          <button class="expand-btn" data-centro-id="${centro.id}">
            <span class="expand-text">Ver más</span>
            <div class="expand-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </button>
        </div>

        <div class="centro-details" style="display: none;">
          <div class="detail-item">
            <div class="detail-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="detail-content">
              <span class="detail-label">Domicilio:</span>
              <span class="detail-value">${centro.domicilio}</span>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="detail-content">
              <span class="detail-label">Teléfono:</span>
              <span class="detail-value">${centro.telefono}</span>
            </div>
          </div>
        </div>

        <div class="centro-services" style="display: none;">
          <div class="service-item ${centro.farmacia ? 'available' : 'unavailable'}">
            <div class="service-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div class="service-content">
              <span class="service-label">Farmacia</span>
              <span class="service-status">${centro.farmacia ? 'Sí' : 'No'}</span>
            </div>
          </div>

          <div class="service-item ${centro.laboratorio ? 'available' : 'unavailable'}">
            <div class="service-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
              </svg>
            </div>
            <div class="service-content">
              <span class="service-label">Laboratorio</span>
              <span class="service-status">${centro.laboratorio ? 'Sí' : 'No'}</span>
            </div>
          </div>
        </div>

        <div class="centro-specialties" style="display: none;">
          <div class="specialties-header">
            <button class="specialties-toggle" data-centro-id="${centro.id}" data-centro-name="${centro.efector}">
              <span class="toggle-text">Ver especialidades</span>
              <div class="toggle-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderEspecialidad(especialidad) {
    return `
      <div class="especialidad-item">
        <div class="especialidad-header">
          <h5 class="especialidad-name">${especialidad.nombre}</h5>
          <div class="especialidad-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
        
        <div class="especialidad-details">
          <div class="especialidad-info">
            <div class="info-section">
              <h6 class="info-title">Horarios:</h6>
              <ul class="horarios-list">
                ${especialidad.horarios.map(horario => `<li>${horario}</li>`).join('')}
              </ul>
            </div>
            
            <div class="info-section">
              <h6 class="info-title">Turnos programados:</h6>
              <span class="info-value ${especialidad.turnosProgramados ? 'available' : 'unavailable'}">
                ${especialidad.turnosProgramados || 'No'}
              </span>
            </div>
            
            <div class="info-section">
              <h6 class="info-title">Última actualización:</h6>
              <span class="info-value">${especialidad.fechaActualizacion}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  addSpecialtyAccordion(element) {
    setTimeout(() => {
      const toggleButtons = element.querySelectorAll('.specialties-toggle');
      const expandButtons = element.querySelectorAll('.expand-btn');
      
      toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
          const centroId = button.getAttribute('data-centro-id');
          const centroName = button.getAttribute('data-centro-name');
          this.openSpecialtiesModal(centroId, centroName);
        });
      });

      expandButtons.forEach(button => {
        button.addEventListener('click', () => {
          const centroId = button.getAttribute('data-centro-id');
          this.toggleCentroCard(centroId);
        });
      });
    }, 0);
  },

  toggleCentroCard(centroId) {
    const card = document.querySelector(`[data-centro-id="${centroId}"]`);
    if (!card) return;

    const details = card.querySelector('.centro-details');
    const services = card.querySelector('.centro-services');
    const specialties = card.querySelector('.centro-specialties');
    const expandBtn = card.querySelector('.expand-btn');
    const expandText = expandBtn.querySelector('.expand-text');
    const expandIcon = expandBtn.querySelector('.expand-icon svg');

    const isExpanded = !card.classList.contains('compact');

    if (isExpanded) {
      details.style.display = 'none';
      services.style.display = 'none';
      specialties.style.display = 'none';
      expandText.textContent = 'Ver más';
      expandIcon.style.transform = 'rotate(0deg)';
      card.classList.add('compact');
      card.classList.remove('expanded');
    } else {
      details.style.display = 'block';
      services.style.display = 'block';
      specialties.style.display = 'block';
      expandText.textContent = 'Ver menos';
      expandIcon.style.transform = 'rotate(180deg)';
      card.classList.remove('compact');
      card.classList.add('expanded');
    }
  },

  async openSpecialtiesModal(centroId, centroName) {
    const modal = document.createElement('div');
    modal.classList.add('specialties-modal');
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Especialidades - ${centroName}</h3>
            <button class="modal-close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="loading">Cargando especialidades...</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    try {
      const data = await this.loadCentros();
      const centro = data.centros.find(c => c.id == centroId);
      
      if (centro && centro.especialidades) {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
          <div class="specialties-grid">
            ${centro.especialidades.map(especialidad => this.renderModalEspecialidad(especialidad)).join('')}
          </div>
        `;
        
        this.addModalAccordion(modal);
      } else {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = '<p class="no-specialties">No hay especialidades disponibles para este centro.</p>';
      }
    } catch (error) {
      console.error('Error cargando especialidades:', error);
      const modalBody = modal.querySelector('.modal-body');
      modalBody.innerHTML = '<p class="error">Error al cargar las especialidades.</p>';
    }

    const closeModal = () => {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  },

  renderModalEspecialidad(especialidad) {
    return `
      <div class="modal-especialidad-item">
        <div class="modal-especialidad-header">
          <h4 class="modal-especialidad-name">${especialidad.nombre}</h4>
          <div class="modal-especialidad-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
        
        <div class="modal-especialidad-details">
          <div class="modal-info-section">
            <h5 class="modal-info-title">Horarios:</h5>
            <ul class="modal-horarios-list">
              ${especialidad.horarios.map(horario => `<li>${horario}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-info-section">
            <h5 class="modal-info-title">Turnos programados:</h5>
            <span class="modal-info-value ${especialidad.turnosProgramados ? 'available' : 'unavailable'}">
              ${especialidad.turnosProgramados || 'No'}
            </span>
          </div>
          
          <div class="modal-info-section">
            <h5 class="modal-info-title">Última actualización:</h5>
            <span class="modal-info-value">${especialidad.fechaActualizacion}</span>
          </div>
        </div>
      </div>
    `;
  },

  addModalAccordion(modal) {
    const especialidadItems = modal.querySelectorAll('.modal-especialidad-item');
    
    especialidadItems.forEach(item => {
      const header = item.querySelector('.modal-especialidad-header');
      const details = item.querySelector('.modal-especialidad-details');
      const icon = item.querySelector('.modal-especialidad-icon svg');
      
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        especialidadItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.modal-especialidad-icon svg').style.transform = 'rotate(0deg)';
          }
        });
        
        if (isOpen) {
          item.classList.remove('active');
          icon.style.transform = 'rotate(0deg)';
        } else {
          item.classList.add('active');
          icon.style.transform = 'rotate(45deg)';
        }
      });
    });
  }
};
