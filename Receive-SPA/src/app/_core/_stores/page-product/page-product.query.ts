import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PageProductState, PageProductStore } from './page-producy.store';

@Injectable({
  providedIn: 'root'
})
export class PageProductQuery extends QueryEntity<PageProductState> {
  /**
   *
   */
  constructor(private pageProductStore: PageProductStore) {
    super(pageProductStore);

  }

}
