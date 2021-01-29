import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Cart } from 'src/app/class/cart';
import { Product } from 'src/app/class/product';
import { CartService } from 'src/app/services/cart.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product = {
    id: '',
    name: '',
    imageUrl: '',
    price: 0,
    category: '',
  };

  constructor(private cartService: CartService, private router: Router) {}

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  onAddCart(cart: Product): void {
    this.cartService.addItemToCartList(
      new Cart(v4(), cart.id, cart.name, 1, cart.price)
    );
  }

  onViewDetails() {
    const item: NavigationExtras = { state: { ...this.productItem } };
    this.router.navigate(['product/details'], item);
  }

  ngOnInit(): void {}
}
