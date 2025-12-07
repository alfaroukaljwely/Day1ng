import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/FakeData';
import { IProduct } from '../../Interfaces/IProduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule , RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: IProduct;
  constructor(private route: ActivatedRoute, private products: ProductsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      // this.product = this.products.getOneById(this.productId);
      this.products.getOneById(this.productId).subscribe(data => {
      this.product = data;
    });
    });
  }
}
