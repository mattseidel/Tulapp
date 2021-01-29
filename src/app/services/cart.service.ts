import { Injectable, Output } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cart } from '../class/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  @Output() cartList: Cart[] = [];

  obsArray: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);
  cartArray$: Observable<Cart[]> = this.obsArray.asObservable();
  subject = new Subject<Cart>();
  cartCollection: AngularFirestoreCollection<any>;

  addItemToCartList(cartItem: Cart) {
    this.cartArray$.pipe(take(1)).subscribe((oldCartList) => {
      const newCartList: Cart[] = this.addIQuantityIfExist(
        oldCartList,
        cartItem
      );
      this.obsArray.next(newCartList);
    });
  }

  removeQuantityToItem(cartItem?: Cart) {
    this.cartArray$.pipe(take(1)).subscribe((oldCartList) => {
      const newCartList: Cart[] = this.removeUnitFromCart(
        oldCartList,
        cartItem
      );
      this.obsArray.next(newCartList);
    });
  }

  removeItem(cartItem: Cart) {
    this.cartArray$.pipe(take(1)).subscribe((oldCartList) => {
      const newCartList = this.removeItemFromList(oldCartList, cartItem);
      this.obsArray.next(newCartList);
    });
  }

  getCartList() {
    return this.obsArray.asObservable();
  }

  constructor(private afs: AngularFirestore) {
    this.cartCollection = afs.collection<any>('cart');
  }

  private removeItemFromList(cartList: Cart[], cartItem: Cart) {
    return cartList.filter((item) => item.productId !== cartItem.productId);
  }

  private addIQuantityIfExist(cartList: Cart[], item: Cart): Cart[] {
    let found: boolean = false;
    cartList.map((cart) => {
      if (cart.productId === item.productId) {
        cart.qty++;
        found = true;
      }
      return cart;
    });
    if (!found) {
      cartList.push(item);
    }
    return cartList;
  }

  private removeUnitFromCart(cartList: Cart[], cartItem?: Cart): Cart[] {
    return cartList.map((cart) => {
      if (cart.productId === cartItem?.productId) {
        cart.qty--;
      }
      return cart;
    });
  }
  onMakeBuy(userId: string, total: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.getCartList().subscribe((data) => {
          const id = this.afs.createId();

          const budgets = data.map(({ name, price, qty, productId }) => {
            return { name, price, qty, productId };
          });
          const newData = { comprador: userId, ...budgets, total };

          console.log(newData);

          const result = this.cartCollection.doc(id).set(newData);

          resolve(result);
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }
  clearCart() {
    this.cartArray$.pipe(take(1)).subscribe((oldCartList) => {
      const newCartList = this.removeAll(oldCartList);
      this.obsArray.next(newCartList);
    });
  }
  private removeAll(cartList: Cart[]) {
    return cartList.filter((item) => item.productId !== item.productId);
  }
}
