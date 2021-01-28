import { Injectable } from '@angular/core';
import { Category } from '../class/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private category: Category[] = [
    { name: 'metales' },
    { name: 'aluminio' },
    { name: 'tuveria' },
  ];

  constructor() {}

  getCategory(): Category[] {
    return this.category;
  }
}
