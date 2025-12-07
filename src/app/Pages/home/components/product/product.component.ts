import { Component, OnInit  } from '@angular/core';
import { ProductsService } from '../../../../Services/FakeData';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../Interfaces/IProduct';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CommonModule , RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products!: Observable<IProduct[]>;

  constructor(private prodService: ProductsService) { }
  ngOnInit(): void {
    this.products = this.prodService.allProduct();
  }
}
