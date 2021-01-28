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
    { name: 'herramientas' },
    { name: 'Escaleras' },
    { name: 'equipos protección individual' },
  ];

  constructor() {}

  getCategory(): Category[] {
    return this.category;
  }
}
