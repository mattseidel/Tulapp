import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ShoppingCartComponent },
  {
    path: 'product/new',
    loadChildren: () =>
      import('./components/product/new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'product/details',
    loadChildren: () =>
      import('./components/product/details/details.module').then(
        (m) => m.DetailsModule
      ),
  },
  {
    path: 'product/edit',
    loadChildren: () =>
      import('./components/product/edit/edit.module').then((m) => m.EditModule),
  },
  {
    path: 'category/new',
    loadChildren: () =>
      import('./components/category/new/new.module').then((m) => m.NewModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
