import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';

import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceComponent } from './components/shopping-cart/filters/price/price.component';
import { NameComponent } from './components/shopping-cart/filters/name/name.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    PriceComponent,
    NameComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({apiKey: 'AIzaSyBCv7Pr5RPS6sH1pLzKahDl-XJxnMRLkEE',
    authDomain: 'tulapp-87336.firebaseapp.com',
    projectId: 'tulapp-87336',
    storageBucket: 'tulapp-87336.appspot.com',
    messagingSenderId: '516077887026',
    appId: '1:516077887026:web:a0731db3d90010e08fa62b',
    measurementId: 'G-GEG2PJ6TG6',}),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
