import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductChangeComponent } from './product-change/product-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { ProductQuery } from '../../_core/_stores/product/product.query';
import { ProductStore } from '../../_core/_stores/product/product.store';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductMainComponent,
    ProductChangeComponent,
    ProductDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    NgSelect2Module,
    NgxSpinnerModule,
    TranslateModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  schemas: [
    NO_ERRORS_SCHEMA
              ]
})
export class ProductModule { }
