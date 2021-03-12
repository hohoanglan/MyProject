import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementMainComponent } from './management-main/management-main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { ManagementEditComponent } from './management-edit/management-edit.component';
import { NgSelect2Module } from 'ng-select2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    ManagementMainComponent,
    ManagementEditComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule,
    BsDatepickerModule,
    NgSelect2Module,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ManagementModule { }
