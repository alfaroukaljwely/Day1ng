import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/FakeData';
import { CartService } from '../../Services/cart.service';
import { IProduct } from '../../Interfaces/IProduct';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Observable<IProduct[]>;

  constructor(
    private prodService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.prodService.allProduct();
  }

  addToCart(product: IProduct) {
    this.cartService.addItem(product, 1);
  }

  goToDetails(prodId: number) {
    this.router.navigate(['/products', prodId]);
  }
}
