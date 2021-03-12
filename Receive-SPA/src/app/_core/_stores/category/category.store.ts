import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Category } from '../../_models/category';

export interface CategoryState extends EntityState<Category> {
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({name: 'category'})
export class CategoryStore extends EntityStore<CategoryState, Category> {
  /**
   *
   */
  constructor() {
    super();

  }
}
