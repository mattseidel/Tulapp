import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChange,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../class/category';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productObservable: Observable<any[]>;
  private productsFireStore: AngularFirestoreCollection<Product>;

  loading = true;

  products: Product[] = [];

  category: Category[] = [];

  obsArray: BehaviorSubject<Product[]> = new BehaviorSubject<any[]>([]);
  productArray$: Observable<Product[]> = this.obsArray.asObservable();

  constructor(private afs: AngularFirestore) {
    this.productsFireStore = this.afs.collection<Product>('products');
    this.productObservable = this.productsFireStore.snapshotChanges().pipe(
      map((actions) =>
        actions.map(({ payload }) => {
          return new Product(
            payload.doc.id,
            this.getPayloadDoc(payload, 'name'),
            this.getPayloadDoc(payload, 'description'),
            this.getPayloadDoc(payload, 'price'),
            this.getPayloadDoc(payload, 'imageUrl'),
            this.getPayloadDoc(payload, 'category')
          );
        })
      )
    );
    this.initializateProductArray();
  }

  getPayloadDoc(payload: DocumentChange<Product>, name: string): any {
    return payload.doc.get(name);
  }

  private initializateProductArray(): void {
    this.productObservable.subscribe((product) => {
      this.products = product;
      this.resetFilters();
      console.log(product);
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

  

  private getFilteredByNammeProducts(
    productArray: Product[],
    name: string
  ): Product[] {
    return productArray.filter((data) => {
      const dataFilter = data.name.toLocaleLowerCase();

      return dataFilter.includes(name.toLowerCase());
    });
  }
  private getFilteredProducts(
    productArray: Product[],
    from: number,
    to: number
  ): Product[] {
    return productArray.filter((data) => data.price > from && data.price < to);
  }

  onDeleteProduct(productid: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.productsFireStore.doc(productid).delete();
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
  onSaveProduct(product: Product, productId?: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = productId || this.afs.createId();
        const data = { ...product };
        const result = this.productsFireStore.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
