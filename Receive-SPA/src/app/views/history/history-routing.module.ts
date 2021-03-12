import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryMainComponent } from './history-main/history-main.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "History Data"},
    children: [
      {
        path: "",
        component: HistoryMainComponent,
        data: {title: "Main"},
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
