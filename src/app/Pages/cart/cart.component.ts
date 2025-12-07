import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../Services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((items) => {
      this.cart = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cart.reduce((s, i) => s + i.price * (i.quantity || 0), 0);
  }

  onQtyChange(item: CartItem, qtyStr: any) {
    const qty = Number(qtyStr.target ? qtyStr.target.value : qtyStr) || 0;
    if (qty <= 0) this.cartService.removeItem(item.id);
    else this.cartService.updateQuantity(item.id, qty);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.id);
  }

  clear() {
    this.cartService.clear();
  }
}
