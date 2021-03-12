import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { ReceiveInfomationModel } from '../_models/receiveInfomation-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductS } from '../_models/productS';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<ReceiveInfomationModel[]>> {
    const paginatedResult: PaginatedResult<ReceiveInfomationModel[]> = new PaginatedResult<ReceiveInfomationModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ReceiveInfomationModel[]>(this.baseUrl + 'history/getHistorys', { observe: 'response', params })
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
  search(page?, itemsPerPage?, filterParam?): Observable<PaginatedResult<ReceiveInfomationModel[]>> {
    const paginatedResult: PaginatedResult<ReceiveInfomationModel[]> = new PaginatedResult<ReceiveInfomationModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.post<any>(this.baseUrl + 'history/search/',filterParam, { observe: 'response', params })
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
    // Get Product 
    getAllProduct(): Observable<ProductS[]> {
      return this.http.get<ProductS[]>(this.baseUrl + 'history/getProducts', {});
    }
  
}
