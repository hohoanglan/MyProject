import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ProductState, ProductStore } from './product.store';

@Injectable({
  providedIn: 'root'
})
export class ProductQuery extends QueryEntity<ProductState> {
  /**
   *
   */
  constructor(private productStore: ProductStore) {
    super(productStore);

  }

}
