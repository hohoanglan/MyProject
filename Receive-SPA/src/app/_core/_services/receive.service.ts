import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../_models/category';
import { ProductS } from '../_models/productS';
import { Receive } from '../_models/receive';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { Warehouse } from '../_models/warehouse';
import { ReceiveDetailModel } from '../_models/receive-detail-model';

@Injectable({
  providedIn: 'root'
})
export class ReceiveService {
  baseUrl = environment.apiUrl;
  receiveIdSource = new BehaviorSubject<string>('');
  currentReceiveID = this.receiveIdSource.asObservable();
  constructor(private http: HttpClient) { }

  // get All Warehouse
  getAllWarehouse(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.baseUrl + 'receive/getWarehouses', {});
  }

  // get All Category
  getAllCategory(warehouseID: any): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'receive/getCategorys/' + warehouseID, {});
  }
  // Get Product of CategoryID
  getProductByCatID(catID: any): Observable<ProductS[]> {
    return this.http.get<ProductS[]>(this.baseUrl + 'receive/getProducts/' + catID, {});
  }

  // Receive Register
  receiveRegister(data: ReceiveDetailModel[]): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'receive/receiveRegister/', data, {});
  }

  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<Receive[]>> {
    const paginatedResult: PaginatedResult<Receive[]> = new PaginatedResult<Receive[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Receive[]>(this.baseUrl + 'receive/getReceives', { observe: 'response', params })
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  changeReceiveID(receiveId: string) {
    this.receiveIdSource.next(receiveId);
  }
} 
