function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/src/public/json/${this.category}.json`;
  }
  async getData() {
  const res = await fetch(this.path);
  console.log(`Fetching ${this.path} returned status:`, res.status);
  if (!res.ok) {
    throw new Error("Bad Response");
  }
  const data = await res.json();
  console.log("Data fetched:", data);
  return data;
}

  async findProductById(id) {
    const products =await this.getData();
    console.log(products); // This will show a Promise
    return products.find((item) => String(item.Id) === String(id));
  }
}
