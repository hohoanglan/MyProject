import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../_core/_services/product.service';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductQuery } from '../../../_core/_stores/product/product.query';
import { ProductStore } from '../../../_core/_stores/product/product.store';
import { Category } from '../../../_core/_models/category';
import { ProductS } from '../../../_core/_models/productS';
import { Observable } from 'rxjs';
import { CategoryQuery } from '../../../_core/_stores/category/category.query';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-product-change',
  templateUrl: './product-change.component.html',
  styleUrls: ['./product-change.component.scss']
})
export class ProductChangeComponent implements OnInit {
  disable = false;
  flag: string;
  listCates$: Observable<Category[]>;
  cates: Category[];
  product: ProductS;
  public categories: Array<Select2OptionData>;
  optionsCategory = {
    allowClear: true,
    width: "100%"
  };
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertify: AlertifyService,
              private translate: TranslateService,
              private productService: ProductService,
              private cateQuery: CategoryQuery,
              private productQuery: ProductQuery,
              private _store: ProductStore
              ) { }

  ngOnInit() {
    this.productService.currentFlag.subscribe(res => this.flag = res);
    this.productService.currentProduct.subscribe(res => this.product = JSON.parse(JSON.stringify(res)));
    this.listCates$ = this.cateQuery.selectAll();
    this.getAllCategory();
  }


  back() {
    this.router.navigate(['/product/manager/']);
  }
 

  getAllCategory() {
    this.productService.getAllCategories();
    this.listCates$.subscribe(res => {
      this.cates = res;
      this.categories = res.map(obj => {
        return {id: obj.id.toString(), text:obj.name_LL}
      })
    })
  }
  changedCategory(e: string): void {
    this.product.catID = parseInt(e);
    let cate = this.cates.find(x=>x.id == this.product.catID);
    this.product.category = cate;
  }
  save() {
    if(this.flag === '0') {
      this.productService.add(this.product).subscribe(res => {
        if(res.result === 'exist') {
          this.alertify.error("Mã sản phẩm này đã tồn tại!")
        } else if(res.result === 'ok') {
          this.alertify.success('Thêm sản phẩm thành công!');
          this.router.navigate(['/product/manager/']);
        } else {
          this.alertify.error('Có lỗi xảy ra!');
        }
      })
    } else {
      this.productService.update(this.product).subscribe(res => {
        if(res.result) {
          this.alertify.success("Đã update thành công!")
          this.router.navigate(['/product/manager/']);
        } else{
          this.alertify.error('Update không thành công!');
        }
      })
    }
  }
  saveAndNext() {
    this.productService.add(this.product).subscribe(res => {
      if(res.result === 'exist') {
        this.alertify.error("Mã sản phẩm này đã tồn tại!")
      } else if(res.result === 'ok') {
        this.alertify.success('Thêm sản phẩm thành công!');
      } else {
        this.alertify.error('Có lỗi xảy ra!');
      }
    })
  }
  cancel() {
    if(this.flag === '0') {
      //this.product = {};
    } else {
      this.productService.currentProduct.subscribe(res => this.product = JSON.parse(JSON.stringify(res)));
    }
  }

}
