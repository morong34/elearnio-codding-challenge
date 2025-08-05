import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { Product } from '../../shared/models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  selectedCategory = signal<string | null>(null);
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  sortAscending = signal<boolean>(false);
  sortDescending = signal<boolean>(false);
  searchTerm = signal<string>('');

  protected _productService = inject(ProductService);
  private _cartService = inject(CartService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this._productService.loadProducts().subscribe({
      next: () => {
        this.products.set(this._productService.getProducts()());
        this.applyFilters();
      },
      error: (err) => console.error('Error loading products', err)
    });
  }

  applyFilters(): void {
    let filtered = this._productService.filterProducts(
      this.selectedCategory(),
      this.minPrice(),
      this.maxPrice()
    );

    if (this.searchTerm()) {
      filtered = this._productService.searchProducts(this.searchTerm());
    }

    if (this.sortAscending() || this.sortDescending()) {
      filtered = this._productService.sortProductsByPrice(filtered, this.sortAscending());
    }

    this.filteredProducts.set(filtered);
  }

  addToCart(product: Product): void {
    this._cartService.addToCart(product);
    this._snackBar.open(`${product.title} added to cart`, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  setCategory(category: string | null): void {
    this.selectedCategory.set(category);
    this.applyFilters();
  }

  setPriceRange(min: number | null, max: number | null): void {
    this.minPrice.set(min);
    this.maxPrice.set(max);
    this.applyFilters();
  }


  setDefaultSort(): void {
    this.sortAscending.set(false);
    this.sortDescending.set(false);
    this.applyFilters();
  }

  setSortAscending(): void {
    this.sortAscending.set(true);
    this.sortDescending.set(false);
    this.applyFilters();
  }

  setSortDescending(): void {
    this.sortAscending.set(false);
    this.sortDescending.set(true);
    this.applyFilters();
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (value === 'default') {
      this.setDefaultSort();
    } else if (value === 'asc') {
      this.setSortAscending();
    } else if (value === 'desc') {
      this.setSortDescending();
    }
  }
}
