import { header } from './header.js';
import { footer } from './footer.js';
import { faq } from './faq.js';
import { contact } from './contact.js';

export const uiRenderer = {
  init(data) {
    this.data = data;
    this.render();
  },

  render() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const headerEl = header.render();
    const faqEl = faq.render();
    const footerEl = footer.render();
    const contactEl = contact.render();

    app.appendChild(headerEl);
    app.appendChild(faqEl);
    app.appendChild(contactEl);
    app.appendChild(footerEl);
  }
};
