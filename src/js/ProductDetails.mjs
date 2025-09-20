import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;
  

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  const listPrice = product.ListPrice;
  const finalPrice = product.FinalPrice;
  const productPrice = document.querySelector("#p-price");
  const productDiscount = document.querySelector("#p-discount");

  /* Changed how the price is displayed.
   If the list price of a product differs from the final price
   and is also higher, "p-price" will display the list price,
   "p-discount" will become visible (since it's hidden by default),
   and it will display the final discounted price as well. */

  if (listPrice != finalPrice && listPrice > finalPrice) {
    productPrice.innerHTML = `$${listPrice}`;
    productPrice.classList.add('discount-price');
    productDiscount.textContent = `  $${finalPrice}`
    productDiscount.classList.add('show');
  } else {
    productPrice.innerHTML = `$${finalPrice}`;
  }
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}