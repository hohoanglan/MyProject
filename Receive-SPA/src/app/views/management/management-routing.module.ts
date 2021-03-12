import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementEditComponent } from './management-edit/management-edit.component';
import { ManagementMainComponent } from './management-main/management-main.component';

const routes: Routes = [
  {
    path: "",
    data: {title: "Management"},
    children: [
      {
        path: "",
        component: ManagementMainComponent,
        data: {title: "Main"},
      },
      {
        path: "receive-edit/:receiveId",
        component: ManagementEditComponent,
        data: {title: "Edit Receive"}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
