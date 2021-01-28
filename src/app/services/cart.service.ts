import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cart } from '../class/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  @Output() cartList: Cart[] = [
    // new Cart('1', 'ewa', 'product 1', 1, 12),
    // new Cart('2', '12wa', 'product 2', 2, 15),
  ];

  obsArray: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);
  cartArray$: Observable<Cart[]> = this.obsArray.asObservable();
  subject = new Subject<Cart>();

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

  constructor() {}

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
}
