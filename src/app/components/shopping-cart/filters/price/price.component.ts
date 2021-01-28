import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {
  filterByPriceForm: FormGroup;

  constructor(
    private _initialForm: FormBuilder,
    private productService: ProductService
  ) {
    this.filterByPriceForm = this._initialForm.group({
      from: [0, Validators.min(1)],
      to: [0, Validators.min(1)],
    });
  }

  onSubmitFilterByPrice(value: any) {
    this.productService.filterProductsByPrice(value);
  }

  ngOnInit(): void {}
}
