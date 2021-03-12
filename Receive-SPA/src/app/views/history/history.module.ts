import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryMainComponent } from './history-main/history-main.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelect2Module } from 'ng-select2';
@NgModule({
  declarations: [
    HistoryMainComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    HistoryRoutingModule,
    NgxSpinnerModule,
    NgSelect2Module,
    BsDatepickerModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TranslateModule
  ]
})
export class HistoryModule { }
