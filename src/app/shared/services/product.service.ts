import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.interface';
import {Observable, tap, of} from 'rxjs';
import {mockProducts} from '../../../assets/mocks/mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([]);
  private categories = signal<string[]>([]);
  private minPrice = signal<number>(0);
  private maxPrice = signal<number>(0);

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return of(mockProducts).pipe(
      tap(products => {
        this.products.set(products);
        debugger;

        const uniqueCategories = [...new Set(products.map(p => p.category))];
        this.categories.set(uniqueCategories);

        const prices = products.map(p => p.price);
        this.minPrice.set(Math.min(...prices));
        this.maxPrice.set(Math.max(...prices));
      })
    );
  }

  getProducts() {
    return this.products;
  }

  getCategories() {
    return this.categories;
  }

  filterProducts(categoryFilter: string | null, minPriceFilter: number | null, maxPriceFilter: number | null): Product[] {
    return this.products().filter(product => {
      if (categoryFilter && product.category !== categoryFilter) {
        return false;
      }

      if (minPriceFilter !== null && product.price < minPriceFilter) {
        return false;
      }

      if (maxPriceFilter !== null && product.price > maxPriceFilter) {
        return false;
      }

      return true;
    });
  }

  searchProducts(searchTerm: string): Product[] {
    if (!searchTerm.trim()) {
      return this.products();
    }

    const term = searchTerm.toLowerCase();
    return this.products().filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }

  sortProductsByPrice(products: Product[], ascending: boolean = true): Product[] {
    return [...products].sort((a, b) => {
      return ascending ? a.price - b.price : b.price - a.price;
    });
  }
}
