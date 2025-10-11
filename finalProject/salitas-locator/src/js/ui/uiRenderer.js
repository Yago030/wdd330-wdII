import { header } from './header.js';
import { footer } from './footer.js';
import { faq } from './faq.js';

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

    app.appendChild(headerEl);
    app.appendChild(faqEl);
    app.appendChild(footerEl);
  }
};
