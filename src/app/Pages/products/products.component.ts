import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/FakeData';
import { IProduct } from '../../Interfaces/IProduct';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,         
  imports: [CommonModule],   
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Observable<IProduct[]>;

  constructor(private prodService: ProductsService , private router: Router) {}

  ngOnInit(): void {
    this.products = this.prodService.allProduct();
  }

  goToDetails(prodId: number) {
      this.router.navigate(['/products', prodId]);
  }
}
