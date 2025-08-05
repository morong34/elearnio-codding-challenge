import {Injectable, signal, effect, linkedSignal} from '@angular/core';
import { Product } from '../models/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  public totalItems = linkedSignal(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  public totalPrice = linkedSignal(() =>
    this.cartItems().reduce((total, item) =>
      total + (item.product.price * item.quantity), 0)
  );

  public cartItemsValues = linkedSignal(() => this.cartItems())

  constructor() {
    this.loadCart();

    effect(() => {
      this.saveCart(this.cartItems());
    });
  }

  addToCart(product: Product) {
    const currentCart = this.cartItems();
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      this.cartItems.update(items =>
        items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        this.cartItems.set(parsedCart);
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
        localStorage.removeItem('cart');
      }
    }
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
