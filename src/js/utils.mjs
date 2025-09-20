// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  let pathPrefix = ".";
  const path = window.location.pathname;

  if (path.includes("product_pages") || path.includes("cart") || path.includes("checkout") || path.includes("product_listing")) {
    pathPrefix = "..";
  }

  const header = await loadTemplate(`${pathPrefix}/partials/header.html`);
  const footer = await loadTemplate(`${pathPrefix}/partials/footer.html`);

  const headerElement = document.getElementById("dynamic-header");
  const footerElement = document.getElementById("dynamic-footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);

  if (pathPrefix === "..") {
    const logoImg = headerElement.querySelector('img');
    const logoLink = headerElement.querySelector('a');
    const cartLink = headerElement.querySelector('.cart a');

    if (logoImg) {
      logoImg.src = "../images/noun_Tent_2517.svg";
    }
    if (logoLink) {
      logoLink.href = "../index.html";
    }
    if (cartLink) {
      cartLink.href = "../cart/index.html";
    }
  }
}
