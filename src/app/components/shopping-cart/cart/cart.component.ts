import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/class/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItem: Cart[] = [];

  cartTotal: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.getCartList().subscribe((data: any) => {
      this.cartItem = [...data];
      this.getCartTotal();
    });
  }
  getCartTotal() {
    this.cartTotal = this.cartItem.reduce<number>((total, subTotal) => {
      return total + subTotal.price * subTotal.qty;
    }, 0);
  }
  ngOnInit(): void {}
}
