import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // Calcular el subtotal de los items
    this.itemTotal = this.list.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);
    
    // Mostrar el subtotal
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalElement) {
      subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // Calcular impuestos (6%)
    this.tax = this.itemTotal * 0.06;
    
    // Calcular envío ($10 por el primer item, $2 por cada item adicional)
    if (this.list.length === 0) {
      this.shipping = 0;
    } else {
      this.shipping = 10 + (this.list.length - 1) * 2;
    }
    
    // Calcular total del pedido
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    // Mostrar los totales
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotalElement = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (taxElement) {
      taxElement.textContent = `$${this.tax.toFixed(2)}`;
    }
    
    if (shippingElement) {
      shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    }
    
    if (orderTotalElement) {
      orderTotalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: parseFloat(item.FinalPrice),
      quantity: 1
    }));
  }

  formDataToJSON(form) {
    const formData = new FormData(form);
    const json = {};
    
    for (let [key, value] of formData.entries()) {
      json[key] = value;
    }
    
    return json;
  }

  async checkout(form) {
    try {
      const formData = this.formDataToJSON(form);
      
      const orderData = {
        orderDate: new Date().toISOString(),
        fname: formData.fname,
        lname: formData.lname,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        cardNumber: formData.cardNumber,
        expiration: formData.expiration,
        code: formData.code,
        items: this.packageItems(this.list),
        orderTotal: this.orderTotal.toFixed(2),
        shipping: this.shipping,
        tax: this.tax.toFixed(2)
      };

      const response = await this.externalServices.checkout(orderData);
      
      if (response.success) {
        localStorage.removeItem('so-cart');
        alert('¡Pedido procesado exitosamente!');
        window.location.href = '../index.html';
      } else {
        alert('Error al procesar el pedido. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Error al procesar el pedido. Inténtalo de nuevo.');
    }
  }

}
