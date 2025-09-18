import ProductData from './ProductData.mjs';
import { renderListWithTemplate, loadHeaderFooter } from './utils.mjs';

const availableProducts = ['880RR', '985RF', '985PR', '344YJ'];

const dataSource = new ProductData('tents');

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand?.Name || 'No Brand'}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice || product.ListPrice || '0.00'}</p>
      </a>
    </li>
  `;
}

async function loadProducts() {
  try {
    const allProducts = await dataSource.getData();

    const availableProductsData = allProducts.filter((product) =>
      availableProducts.includes(product.Id),
    );

    const productList = document.querySelector('.product-list');
    renderListWithTemplate(
      productCardTemplate,
      productList,
      availableProductsData,
    );
  } catch (error) {
    console.error('Error loading products:', error);
    document.querySelector('.product-list').innerHTML =
      '<li><p>Error al cargar los productos</p></li>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
  loadProducts();
});
