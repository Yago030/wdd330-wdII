import { header } from './header.js';
import { hero } from './hero.js';
import { footer } from './footer.js';
import { faq } from './faq.js';
import { contact } from './contact.js';
import { centros } from './centros.js';
import { aboutUs } from './about-us.js';
export const uiRenderer = {
  init(data) {
    this.data = data;
    this.render();
  },

  async render() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const headerEl = header.render();
    const heroEl = hero.render();
    const aboutUsEl = aboutUs.render();
    const centrosEl = await centros.render();
    const faqEl = faq.render();
    const footerEl = footer.render();
    const contactEl = contact.render();

    app.appendChild(headerEl);
    app.appendChild(heroEl);
    app.appendChild(aboutUsEl);
    app.appendChild(centrosEl);
    app.appendChild(faqEl);
    app.appendChild(contactEl);
    app.appendChild(footerEl);
  }
};
