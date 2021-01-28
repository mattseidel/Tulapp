import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/class/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cart: Cart = {
    id: '',
    name: '',
    price: 0,
    productId: '',
    qty: 0,
  };

  constructor(private cartService: CartService) {}

  onRemoveQuantyItem(cart: Cart) {
    this.cartService.removeQuantityToItem(cart);
  }

  onRemoveItem(cart: Cart) {
    if (confirm('¿Está seguro que desea eliminar el elemento de la compra?'))
      this.cartService.removeItem(cart);
  }

  ngOnInit() {}
}
