import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/class/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  loading: boolean = true;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log(this.loading);

    this.productService.getProducts().subscribe((newData) => {
      this.productList = newData;
      this.loading = false;
    });
  }
}
