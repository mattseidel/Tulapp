import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from '../class/category';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    new Product(
      'asdasda',
      'Product 1',
      'this is a product',
      20,
      '',
      new Category('metal')
    ),
    new Product(
      'asdassd',
      'Product 2',
      'this is a product',
      2,
      '',
      new Category('metal')
    ),
    new Product(
      'asdrwqe32',
      'Product 3',
      'this is a product',
      12,
      '',
      new Category('metal')
    ),
    new Product(
      'asdas4123a',
      'Product 4',
      'this is a product',
      22,
      '',
      new Category('tuveria')
    ),
    new Product(
      'asdasdaewq1',
      'Product 5',
      'this is a product',
      36,
      '',
      new Category('aluminio')
    ),
    new Product(
      'adfasdaewq1',
      'Product 6',
      'this is a product',
      46,
      '',
      new Category('metal')
    ),
    new Product(
      'asdqwewq1',
      'Product 7',
      'this is a product',
      66,
      '',
      new Category('tuveria')
    ),
  ];

  category: Category[] = [];

  obsArray: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productArray$: Observable<Product[]> = this.obsArray.asObservable();

  constructor() {
    this.resetFilters();
  }

  resetFilters(): void {
    this.productArray$.pipe(take(1)).subscribe(() => {
      const newProduct: Product[] = this.products;
      this.obsArray.next(newProduct);
    });
  }

  /**
   * populate the products from an API
   * @returns Observable
   */
  getProducts() {
    return this.obsArray.asObservable();
  }

  filterProductsByPrice({ from, to }: any) {
    this.productArray$.pipe(take(1)).subscribe(() => {
      const newProduct = this.getFilteredProducts(this.products, from, to);
      this.obsArray.next(newProduct);
    });
  }

  filterProoductByCategory(data: string): any {
    this.productArray$.pipe(take(1)).subscribe(() => {
      const newProduct = this.getFilteredByCategory(this.products, data);
      this.obsArray.next(newProduct);
    });
  }

  filterProoductByName(name: string) {
    if (name === '') {
      this.resetFilters();
    } else {
      this.productArray$.pipe(take(1)).subscribe(() => {
        const newProduct = this.getFilteredByNammeProducts(this.products, name);
        this.obsArray.next(newProduct);
      });
    }
  }

  private getFilteredByCategory(
    productArray: Product[],
    category: string
  ): Product[] {
    return productArray.filter((data) => data.category.name.includes(category));
  }

  private getFilteredByNammeProducts(
    productArray: Product[],
    name: string
  ): Product[] {
    return productArray.filter((data) => data.name.includes(name));
  }
  private getFilteredProducts(
    productArray: Product[],
    from: number,
    to: number
  ): Product[] {
    return productArray.filter((data) => data.price > from && data.price < to);
  }
}
