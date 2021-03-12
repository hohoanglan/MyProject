import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Receive } from "../../_models/receive";

export interface ReceiveState extends EntityState<Receive> {
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({name: 'product'})
export class ReceiveStore extends EntityStore<ReceiveState, Receive> {
  /**
   *
   */
  constructor() {
    super();

  }
}