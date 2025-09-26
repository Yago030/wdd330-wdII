import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';


const productID = getParam('product');
const dataSource = new ExternalServices();
const product = new ProductDetails(productID, dataSource);
product.init();

loadHeaderFooter();
