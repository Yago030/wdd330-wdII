import { getLocalStorage, loadHeaderFooter, setLocalStorage } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotal = document.querySelector('.cart-total');
  const productList = document.querySelector('.product-list');

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join('');
    const removeButtons = productList.querySelectorAll('.remove-product-btn');
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetProduct = cartItems.findIndex((item) => item.Id === button.dataset.id );
        cartItems.splice(targetProduct, 1);
        setLocalStorage('so-cart', cartItems);
        location.reload();
      });
    });

    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.FinalPrice),
      0,
    );

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
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-product-btn" data-id="${item.Id}" aria-label="Remove Product Button">X</button>
</li>`;

  return newItem;
}

renderCartContents();

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('checkout-btn')) {
    window.location.href = '../checkout/index.html';
  }
});
