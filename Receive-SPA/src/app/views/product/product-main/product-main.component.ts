import { Component, OnInit } from "@angular/core";
import { Pagination, PaginatedResult } from "../../../_core/_models/pagination";
import { Router } from "@angular/router";
import { ProductService } from "../../../_core/_services/product.service";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from "@ngx-translate/core";
import { ProductStore } from '../../../_core/_stores/product/product.store';
import { ProductQuery } from '../../../_core/_stores/product/product.query';
import { Observable } from "rxjs";
import { ProductS } from "../../../_core/_models/productS";

@Component({
  selector: "app-product-main",
  templateUrl: "./product-main.component.html",
  styleUrls: ["./product-main.component.scss"],
})
export class ProductMainComponent implements OnInit {
  isLoading$: Observable<boolean>;
  listProducts$: Observable<ProductS[]>;
  productID: string = '';
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private router: Router,
    private productService: ProductService,
    private translate: TranslateService,
    private alertify: AlertifyService,
    private productStore: ProductStore,
    private productQuery: ProductQuery,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.productQuery.selectLoading();
    this.loadData2();
    this.listProducts$ = this.productQuery.selectAll();
    //this.listProducts$ = this.productQuery.selectMany([]) ;
    this.listProducts$.subscribe(res => console.log("listProducts: ",res));
  }

  add() {
    this.productService.changeFlag("0");
    this.productService.changProduct({});
    this.router.navigate(["/product/manager/change"]);
  }

  loadData2() {
    this.isLoading$ = this.productQuery.selectLoading();
    this.productService.getListAllUseStore(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (result: Pagination) => {
        this.pagination = result
      }
    );

  }
  search() {
    this.pagination.currentPage = 1;
    if (this.productID === '' || (this.productID.indexOf(' ') >= 0)) {
      this.loadData2();
    } else {
      this.productService.search(this.pagination.currentPage,this.pagination.itemsPerPage,this.productID).subscribe(
          (res) => {
            this.pagination = res.pagination;
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    }
  }
  pageChanged(event: any): void {
    this.isLoading$ = this.productQuery.selectLoading();
    this.pagination.currentPage = event.page;
    this.loadData2();
  }

  delete(productID: string) {
    this.alertify.confirm("Delete product!", "You are delete?", () => {
      this.productService.remove(productID);
    });
  }

  ngAfterContentChecked(): void {
    this.listProducts$ = this.productQuery.selectAll();

  }

}
