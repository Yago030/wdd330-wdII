import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotal = document.querySelector('.cart-total');
  
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);
    
    cartFooter.classList.remove('hide');
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add('hide');
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('checkout-btn')) {
    window.location.href = '../checkout/index.html';
  }
});
