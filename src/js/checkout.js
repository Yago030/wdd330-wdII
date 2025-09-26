import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess('so-cart', '.order-summary');
checkoutProcess.init();

const zipInput = document.getElementById('zip');
if (zipInput) {
  zipInput.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
      checkoutProcess.calculateOrderTotal();
    }
  });
}

const checkoutForm = document.querySelector('.checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const requiredFields = this.querySelectorAll('[required]');
    let allFieldsFilled = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        allFieldsFilled = false;
        field.style.borderColor = 'red';
      } else {
        field.style.borderColor = '';
      }
    });
    
    if (!allFieldsFilled) {
      alert('Please fill in all required fields.');
      return;
    }
    
    const cartItems = JSON.parse(localStorage.getItem('so-cart') || '[]');
    if (cartItems.length === 0) {
      alert('No items in cart.');
      return;
    }
    
    await checkoutProcess.checkout(this);
  });
}

const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
    }
  });
}

const expirationInput = document.getElementById('expiration');
if (expirationInput) {
  expirationInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value.length >= 2) {
      this.value = this.value.slice(0, 2) + '/' + this.value.slice(2, 4);
    }
  });
}

const codeInput = document.getElementById('code');
if (codeInput) {
  codeInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3);
    }
  });
}
