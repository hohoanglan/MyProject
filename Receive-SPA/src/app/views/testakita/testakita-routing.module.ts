import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAkitaComponent } from './add-akita/add-akita.component';
import { EditAkitaComponent } from './edit-akita/edit-akita.component';
import { ListAkitaComponent } from './list-akita/list-akita.component';


const routes: Routes = [
  {
    path: "",
    data: {title: "Test Akita"},
    children: [
      {
        path: "",
        component: ListAkitaComponent,
        data: {title: "Main"},
      },
      {
        path: "add",
        component: AddAkitaComponent,
        data: {title: "Add Product"},
      },
      {
        path: "edit/:id",
        component: EditAkitaComponent,
        data: {title: "Edit Product"},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestakitaRoutingModule { }
