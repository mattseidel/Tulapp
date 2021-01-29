import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/class/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItem: Cart[] = [];

  cartTotal: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
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

  onBuy() {
    this.authService.getUserData().subscribe((data) => {
      if (data) {
        this.cartService
          .onMakeBuy(data.uid, this.cartTotal)
          .then((data) => {
            alert('compra realizada con exito');
          })
          .catch(console.log);
      } else {
        alert('debes estar logueado para continuar');
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {}
}
