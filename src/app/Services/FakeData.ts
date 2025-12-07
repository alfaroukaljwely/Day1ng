import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Interfaces/IProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private url = 'https://fakestoreapi.com/products';

  constructor(private client : HttpClient) {
  }


  allProduct() : Observable<IProduct[]> {
    return this.client.get<IProduct[]>(this.url);
  }

  getOneById(id: number) : Observable<IProduct> {
       return this.client.get<IProduct>(`${this.url}/${id}`);
  }
}
