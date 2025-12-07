import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../Interfaces/IProduct';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.readFromStorage());

  // observable streams
  cart$ = this.cartSubject.asObservable();
  count$: Observable<number> = this.cart$.pipe(
    map((items) => items.reduce((s, i) => s + (i.quantity || 0), 0))
  );
  total$: Observable<number> = this.cart$.pipe(
    map((items) => items.reduce((s, i) => s + (i.quantity || 0) * i.price, 0))
  );

  constructor() {
    // persist whenever cart changes
    this.cart$.subscribe((items) => this.writeToStorage(items));
  }

  private readFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed reading cart from storage', e);
      return [];
    }
  }

  private writeToStorage(items: CartItem[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed writing cart to storage', e);
    }
  }

  getCartSnapshot(): CartItem[] {
    return this.cartSubject.getValue();
  }

  addItem(product: IProduct, quantity = 1) {
    const items = this.getCartSnapshot();
    const idx = items.findIndex((i) => i.id === product.id);
    if (idx >= 0) {
      items[idx].quantity = (items[idx].quantity || 0) + quantity;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        price: product.price as any as number,
        image: (product as any).image,
        quantity,
      });
    }
    this.cartSubject.next([...items]);
  }

  updateQuantity(id: number, quantity: number) {
    const items = this.getCartSnapshot();
    const idx = items.findIndex((i) => i.id === id);
    if (idx >= 0) {
      if (quantity <= 0) items.splice(idx, 1);
      else items[idx].quantity = quantity;
      this.cartSubject.next([...items]);
    }
  }

  removeItem(id: number) {
    const items = this.getCartSnapshot().filter((i) => i.id !== id);
    this.cartSubject.next([...items]);
  }

  clear() {
    this.cartSubject.next([]);
  }
}
