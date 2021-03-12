import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { ReceiveDetail } from '../_models/receive-detail';

@Injectable({
  providedIn: 'root'
})
export class ReceiveDetailService {
  baseUrl = environment.apiUrl;
  receiveIdSource = new BehaviorSubject<string>('');
  currentReceiveID = this.receiveIdSource.asObservable();
  backUrlSource = new BehaviorSubject<string>('');
  currentBackUrl = this.backUrlSource.asObservable();
  constructor(private http: HttpClient) { }
  getReceiveDetail(receiveId: string): Observable<ReceiveDetail[]> {
    return this.http.get<ReceiveDetail[]>(this.baseUrl + 'receive/getReceiveDetails/' + receiveId)
  }
  changeReceiveID(receiveId: string) {
    this.receiveIdSource.next(receiveId);
  }
  changeBackUrl(url: string) {
    this.backUrlSource.next(url)
  }
}
