import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserModel } from '../_models/user-model';
import { Role } from '../_models/role';
import { Department } from '../_models/department';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  userSource = new BehaviorSubject<object>({});
  currentUser = this.userSource.asObservable();
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?,UserID?): Observable<PaginatedResult<UserModel[]>> {
    const paginatedResult: PaginatedResult<UserModel[]> = new PaginatedResult<UserModel[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.post<UserModel[]>(this.baseUrl + 'user/getUsers/', UserID, { observe: 'response', params })
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
  addUser(model: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'user/create/', model, {});
  }
  getListRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + 'user/getRoles', {});
  }
  getListDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl + 'user/getDepartments', {});
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'user/delete/' + userId, {});
  }
  editUser(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'user/edit/', user, {});
  }
  checkExistUser(userId: string) : Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user/checkExist/' + userId, {});
  }
  changeFlag(flag : string) {
    this.flagSource.next(flag);
  }
  changeUser(user: any) {
    this.userSource.next(user);
  }
}
