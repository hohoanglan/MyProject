import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { CategoryState, CategoryStore } from './category.store';

@Injectable({
  providedIn: 'root'
})
export class CategoryQuery extends QueryEntity<CategoryState> {
  /**
   *
   */
  constructor(private categoryStore: CategoryStore) {
    super(categoryStore);

  }

}
