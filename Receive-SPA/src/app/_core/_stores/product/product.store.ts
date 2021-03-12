import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { ProductS } from '../../_models/productS';

export interface ProductState extends EntityState<ProductS> {
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({name: 'product'})
export class ProductStore extends EntityStore<ProductState, ProductS> {
  /**
   *
   */
  constructor() {
    super();

  }
}
