import { Component } from '@angular/core';
import { Header } from './core/components/header/header';
import { ProductListComponent } from './features/product-list/product-list.component';
import { CartComponent } from './features/cart/cart.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header />
    <main>
      <app-product-list />
      <app-cart />
    </main>
  `,
  imports: [Header, ProductListComponent, CartComponent],
  styleUrl: './app.css'
})
export class App {}
