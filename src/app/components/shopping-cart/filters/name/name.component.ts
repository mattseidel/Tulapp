import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent implements OnInit {
  filterByName: FormGroup;

  constructor(
    private _initialForm: FormBuilder,
    private productService: ProductService
  ) {
    this.filterByName = this._initialForm.group({
      name: ['', []],
    });
  }

  ngOnInit(): void {}
  onSubmitFilterByName(value: any): void {
    this.productService.filterProoductByName(value.name);
  }
}
