import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainComponent } from './user-main/user-main.component';
import { UserChangeComponent } from './user-change/user-change.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "User Data"},
    children: [
      {
        path: "",
        component: UserMainComponent,
        data: {title: "Main"},
      },
      {
        path: "change",
        component: UserChangeComponent,
        data: {title: "Change User"},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
