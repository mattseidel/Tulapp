import { Component, OnInit, Input } from '@angular/core';
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
    category: { name: '' },
  };

  constructor(private cartService: CartService) {}

  onAddCart(cart: Product): void {
    this.cartService.addItemToCartList(
      new Cart(v4(), cart.id, cart.name, 1, cart.price)
    );
  }

  ngOnInit(): void {}
}
