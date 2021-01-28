export class Cart {
  id: string;
  productId: string;
  name: string;
  qty: number;
  price: number;

  constructor(
    id: string,
    productId: string = '',
    name: string = '',
    qty: number = 1,
    price: number = 0
  ) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.qty = qty;
    this.price = price;
  }
}
