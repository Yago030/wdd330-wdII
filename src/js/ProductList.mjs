import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      this.renderProductList(products);
    } catch (error) {
      console.error('Error loading products:', error);
      this.listElement.innerHTML = '<li><p>Error al cargar los productos</p></li>';
    }
  }

  renderProductList(products) {
    const template = (product) => {
      const imageUrl = product.Image || product.Images?.PrimaryLarge || '/images/placeholder.png';
      const brandName = product.Brand?.Name || product.Name?.split(' ')[0] || 'No Brand';
      const price = product.FinalPrice || product.ListPrice || product.Price || '0.00';
      
      return `
        <li class="product-card">
          <a href="../product_pages/index.html?product=${product.Id}">
            <img
              src="${imageUrl}"
              alt="${product.NameWithoutBrand}"
            />
            <h3 class="card__brand">${brandName}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${price}</p>
          </a>
        </li>
      `;
    };

    renderListWithTemplate(template, this.listElement, products);
  }
}
