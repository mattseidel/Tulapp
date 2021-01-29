import { Category } from './category';

export class Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;

  constructor(
    id: string,
    name: string,
    description: string = '',
    price: number,
    imageUrl: string = 'https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-landscape.jpg',
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
  }
}
