import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productID = getParam('product');
const dataSource = new ProductData('tents');
const product = new ProductDetails(productID, dataSource);
product.init();

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});
