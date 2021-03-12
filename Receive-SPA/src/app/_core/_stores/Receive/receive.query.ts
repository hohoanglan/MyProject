import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ReceiveState, ReceiveStore } from "./Receive.store";

@Injectable({
    providedIn: 'root'
  })
  export class ReceiveQuery extends QueryEntity<ReceiveState> {
    /**
     *
     */
    constructor(private receiveStore: ReceiveStore) {
      super(receiveStore);
  
    }
  
  }