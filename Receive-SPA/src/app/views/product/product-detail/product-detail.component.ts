import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Observable } from 'rxjs';
import { Category } from '../../../_core/_models/category';
import { ProductS } from '../../../_core/_models/productS';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { ProductService } from '../../../_core/_services/product.service';
import { CategoryQuery } from '../../../_core/_stores/category/category.query';
import { CategoryStore } from '../../../_core/_stores/category/category.store';
import { ProductQuery } from '../../../_core/_stores/product/product.query';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  editForm: FormGroup;
  product$ = this.productQuery.selectEntity(this.productId);
  listCates$: Observable<Category[]>;
  cates: Category[];
  public categories: Array<Select2OptionData>;
  optionsCategory = {
    allowClear: true,
    width: "100%"
  };
  constructor(
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertify: AlertifyService,
              private productService: ProductService,
              private productQuery: ProductQuery,
              private cateQuery: CategoryQuery,
              private fb: FormBuilder,
  ){  }

  ngOnInit() {
    if(this.productQuery.hasEntity(this.productId) === false) {
      this.productService.oneProduct(this.productId)
    }

    this.initForm();
    this.product$.subscribe(res => {
      this.editForm.patchValue({
        id: res.id,
        name: res.name,
        catID: res.catID
      })
    })

    this.listCates$ = this.cateQuery.selectAll();
    this.getAllCategory();
  }

  get productId() {
    return this.activatedRoute.snapshot.params.id;
  }

  save() {
    console.log(this.product$);
    this.productService.update(this.editForm.getRawValue()).subscribe(res => {
      if(res.result) {
        this.alertify.success("Đã update thành công!")
        this.router.navigate(['/product/manager/']);
      } else{
        this.alertify.error('Update không thành công!');
      }
    })
  }

  cancel() {

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
  //  this.product.catID = parseInt(e);
    console.log(e);
  //  let cate = this.cates.find(x=>x.id == this.product.catID);
  //  this.product.category = cate;
  }


  back() {
    this.router.navigate(['/product/manager/']);
  }

  initForm() {
    this.editForm = this.fb.group({
      id: [{value: "", disabled: true },Validators.compose([Validators.required])],
      name: ["",Validators.compose([Validators.required])],
      catID: ["",Validators.compose([Validators.required])]
    })
  }

}
