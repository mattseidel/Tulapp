import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  value: any;

  constructor(private router: Router, private productService: ProductService) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras.state || {};

    console.log(this.value);
  }

  onDelete() {
    if (confirm('¿Está seguro que desea eliminar este producto?'))
      this.productService.onDeleteProduct(this.value.id).then(() => {
        this.router.navigate(['/']);
      });
  }

  onEdit() {
    const item: NavigationExtras = { state: { ...this.value } };
    this.router.navigate(['/product/edit'], item);
  }

  ngOnInit(): void {}
}
