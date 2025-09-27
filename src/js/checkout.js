import { loadHeaderFooter, alertMessage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess('so-cart', '.order-summary');
checkoutProcess.init();

const zipInput = document.getElementById('zip');
if (zipInput) {
  zipInput.addEventListener('blur', function () {
    if (this.value.trim() !== '') {
      checkoutProcess.calculateOrderTotal();
    }
  });
}

const checkoutForm = document.querySelector('.checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const chk_status = this.checkValidity();
    this.reportValidity();

    if (!chk_status) {
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('so-cart') || '[]');
    if (cartItems.length === 0) {
      alertMessage('No hay items en el carrito.');
      return;
    }

    try {
      await checkoutProcess.checkout(this);
    } catch (error) {
      alertMessage(error.message);
    }
  });
}

const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
    }
  });
}

const expirationInput = document.getElementById('expiration');
if (expirationInput) {
  expirationInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length >= 2) {
      this.value = this.value.slice(0, 2) + '/' + this.value.slice(2, 4);
    }
  });
}

const codeInput = document.getElementById('code');
if (codeInput) {
  codeInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3);
    }
  });
}
