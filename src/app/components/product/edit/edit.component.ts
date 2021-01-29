import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  categories: Category[] = [];
  newProductForm: FormGroup;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  value: any;
  constructor(
    private categoryService: CategoryService,
    private _initialForm: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.categoryService.category.subscribe((data) => {
      this.categories = data;
    });
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras.state || {};
    console.log(this.value);

    this.newProductForm = this._initialForm.group({
      name: [this.value.name, [Validators.required, Validators.minLength(5)]],
      description: [
        this.value.description,
        [Validators.minLength(10), Validators.maxLength(250)],
      ],
      price: [this.value.price, [Validators.required, Validators.min(0.1)]],
      imageUrl: [
        this.value.imageUrl,
        [Validators.required, Validators.pattern(this.reg)],
      ],
      category: [this.value.category, [Validators.required]],
    });
  }

  onSubmit(data: any) {
    this.productService.onSaveProduct(data, this.value.id).then(() => {
      alert('producto modificado exitosamente');
      this.router.navigate(['']);
    });
  }

  ngOnInit(): void {}
}
