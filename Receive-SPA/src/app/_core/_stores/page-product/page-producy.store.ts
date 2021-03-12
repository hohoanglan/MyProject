import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { PaginatedResult } from '../../_models/pagination';
import { ProductS } from '../../_models/productS';

export interface PageProductState extends EntityState<PaginatedResult<ProductS>> {
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({name: 'product'})
export class PageProductStore extends EntityStore<PageProductState, PaginatedResult<ProductS>> {
  /**
   *
   */
  constructor() {
    super();

  }
}
