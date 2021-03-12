import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { ProductQuery } from '../../_core/_stores/product/product.query';
import { ProductStore } from '../../_core/_stores/product/product.store';
import { ListAkitaComponent } from './list-akita/list-akita.component';
import { EditAkitaComponent } from './edit-akita/edit-akita.component';
import { AddAkitaComponent } from './add-akita/add-akita.component';
import { TestakitaRoutingModule } from './testakita-routing.module';

@NgModule({
  declarations: [
    ListAkitaComponent,
    EditAkitaComponent,
    AddAkitaComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TestakitaRoutingModule,
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
export class TestakitaModule { }
