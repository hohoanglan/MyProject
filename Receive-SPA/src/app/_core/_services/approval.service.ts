import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { ReceiveInfomationModel } from '../_models/receiveInfomation-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<ReceiveInfomationModel[]>> {
    const paginatedResult: PaginatedResult<ReceiveInfomationModel[]> = new PaginatedResult<ReceiveInfomationModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ReceiveInfomationModel[]>(this.baseUrl + 'approval/getReceives', { observe: 'response', params })
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
  search(page?, itemsPerPage?,filterParam?): Observable<PaginatedResult<ReceiveInfomationModel[]>> {
    const paginatedResult: PaginatedResult<ReceiveInfomationModel[]> = new PaginatedResult<ReceiveInfomationModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.post<ReceiveInfomationModel[]>(this.baseUrl + 'approval/search/',filterParam, { observe: 'response', params })
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
  acceptReceive(receiveID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'approval/acceptReceive/' + receiveID, {});
  }
  delineReceive(receiveID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'approval/declineReceive/' + receiveID, {});
  }
}
