export class Model {

  categoryName: string;
  products: Array<Product>;

  constructor() { }

}

export class Product {
  productId: number;
  name: string;
  price: number;
  isActive: boolean;

  constructor(productId: number, name: string, price: number, isActive: boolean) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.isActive = isActive;
  }
}


