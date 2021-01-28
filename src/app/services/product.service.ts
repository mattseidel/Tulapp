import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../class/category';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productObservable: Observable<Product[]>;
  private productsFireStore: AngularFirestoreCollection<Product>;

  loading = true;

  products: Product[] = [];

  category: Category[] = [];

  obsArray: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productArray$: Observable<Product[]> = this.obsArray.asObservable();

  constructor(private afs: AngularFirestore) {
    this.productsFireStore = this.afs.collection<Product>('products');
    this.productObservable = this.productsFireStore
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Product))
      );
    this.initializateProductArray();
  }

  private initializateProductArray(): void {
    this.productObservable.subscribe((product) => {
      this.products = product;
      this.resetFilters();
      this.loading = false;
    });
  }

  resetFilters(): void {
    this.productArray$.pipe(take(1)).subscribe(() => {
      this.obsArray.next(this.products);
      console.log(this.products);
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
