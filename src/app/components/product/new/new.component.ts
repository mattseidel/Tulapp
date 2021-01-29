import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  categories: Category[] = [];
  newProductForm: FormGroup;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private categoryService: CategoryService,
    private _initialForm: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.categoryService.category.subscribe((data) => {
      this.categories = data;
    });
    this.newProductForm = this._initialForm.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.minLength(10), Validators.maxLength(250)]],
      price: [0, [Validators.required, Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern(this.reg)]],
      category: ['', Validators.required],
    });
  }
  onSave(data: any) {
    this.productService.onSaveProduct(data).then(() => {
      alert('Producto agregado satisfactoriamente');
      this.router.navigate(['/']);
    });
  }
  ngOnInit(): void {}
}
