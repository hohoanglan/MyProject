import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of, timer } from 'rxjs';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError, delay, map, mapTo, sample, tap } from 'rxjs/operators';
import { ProductS } from '../_models/productS';
import { Category } from '../_models/category';
import { ProductStore } from '../_stores/product/product.store';
import { AlertifyService } from './alertify.service';
import { CategoryStore } from '../_stores/category/category.store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  productSource = new BehaviorSubject<object>({});
  currentProduct = this.productSource.asObservable();
  constructor(
    private http: HttpClient,
    private _store: ProductStore,
    private alertify: AlertifyService,
    private _cateStore: CategoryStore,
    ) { }

  //--------- use store ---------
  // getLists() {
  //   // var productList;
  //   // this.http.get<ProductS[]>(this.baseUrl + 'product/getAllProducts').subscribe(productS => productList = productS);
  //   // timer(1000).pipe(mapTo<productList)).subscribe(
  //   //   products => {
  //   //     console.log("Service: ",products)
  //   //     this._store.set(products)
  //   //   }
  //   //   );
  //   this.http.get<any>(this.baseUrl + 'product/getAllProducts')
  //     .pipe(
  //      // delay(3000)
  //     ).subscribe(
  //       products => {
  //         console.log("Service: ",products)
  //         this._store.set(products)
  //       }
  //       );
  // }


  getListAllUseStore(page?, itemsPerPage?): Observable<Pagination> {
    const paginatedResult: PaginatedResult<ProductS[]> = new PaginatedResult<ProductS[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ProductS[]>(this.baseUrl + 'product/getProducts', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          this._store.set(paginatedResult.result);
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult.pagination;
        }),
      );
  }
  //---------- end --------------




  search(page?, itemsPerPage?, text?): Observable<PaginatedResult<ProductS[]>> {
    const paginatedResult: PaginatedResult<ProductS[]> = new PaginatedResult<ProductS[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ProductS[]>(this.baseUrl + 'product/search/' + text, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          this._store.set(paginatedResult.result);
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  getAllCategories() {
   this.http.get<Category[]>(this.baseUrl + 'product/categorys/', {}).pipe()
    .subscribe( res => {
      this._cateStore.set(res);
    })
  }
  remove(id: any) {
    this.http.get<any>(this.baseUrl + 'product/remove/' + id, {}).subscribe(
      ()=>{
        this._store.remove(id);
        this.alertify.success("Delete Succeed")
    },(error) => {
      this.alertify.error("Delete Unsucceed")
    });
  }
  add(product: ProductS): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'product/add/', product, {}).pipe(
      tap(res => {
        if(res.result === 'ok') {
          this._store.add(product);
        }
      })
    );
  }

  add2(product: ProductS): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'product/add/', product, {}).pipe(
      tap(res => console.log(res))
    )
  }
  update(product: ProductS) {
    console.log("Sv: ", product)
    return this.http.post<any>(this.baseUrl + 'product/update/', product).pipe(
      tap(res => {
        if(res) {
          this._store.update(product);
        }
      })
    );
  }
  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
  changProduct(product: any){
    this.productSource.next(product);
  }

  oneProduct(id: string) {
    this.http.get<ProductS>(this.baseUrl + 'product/get/' + id, {}).pipe()
    .subscribe(product =>
      {
        this._store.add(product)
        console.log(product)
      });
  }
}
