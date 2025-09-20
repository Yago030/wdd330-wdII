import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    const p = this.product;
    document.title = `Sleep Outside | ${p.NameWithoutBrand}`;

    document.querySelector("h2").textContent = p.Brand?.Name ?? "No Brand";
    document.querySelector("h3").textContent = p.NameWithoutBrand ?? "Product";
    
    document.querySelector(".product-card__price").textContent = 
      `$${p.FinalPrice ?? p.ListPrice ?? "0.00"}`;
    
    document.querySelector(".product__color").textContent = 
      p.Colors?.[0]?.ColorName ?? "N/A";
    
    document.querySelector(".product__description").innerHTML = 
      p.DescriptionHtmlSimple ?? "";

    const img = document.getElementById("productImage");
    const imagePath = p.Images?.PrimaryLarge || p.Image || "/images/tents/placeholder.png";
    img.src = imagePath;
    img.alt = p.NameWithoutBrand ?? "Product image";

    const btn = document.getElementById("addToCart");
    btn.dataset.id = p.Id;
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    console.log(`Product ${this.product.Id} added to cart`);
  }
}
