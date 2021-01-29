import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private productService: ProductService, private router: Router) {}

  onNewProduct(){
    this.router.navigate(['/product/new'])
  }

  onNewCategory(){
    this.router.navigate(['/category/new'])
  }

  ngOnInit(): void {
    console.log(this.loading);

    this.productService.getProducts().subscribe((newData) => {
      this.productList = newData;
      this.loading = false;
    });
  }
}
