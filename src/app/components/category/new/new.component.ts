import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  newCategory: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private _initialForm: FormBuilder
  ) {
    this.newCategory = this._initialForm.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(category: any) {
    this.categoryService.onSaveCategory(category).then((data) => {
      alert('se ha agregado la categoria');
      this.newCategory.reset();
    });
  }

  ngOnInit(): void {}
}
