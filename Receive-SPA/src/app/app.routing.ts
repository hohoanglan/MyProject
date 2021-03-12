import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './_core/_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "admin",
        canActivate: [AuthGuard],
        data : {
          title: "admin"
        },
        children: [
          {
            path: "user",
            loadChildren: () => import("./views/user/user.module").then(m => m.UserModule)
          },
          {
            path: "management",
            loadChildren: () => import("./views/management/management.module").then(m => m.ManagementModule)
          }
        ]
      },
      {
        path: "product",
        canActivate: [AuthGuard],
        data: {
          title : "product",
        },
        children: [
          {
            path: "manager",
            loadChildren: () => import("./views/product/product.module").then(m => m.ProductModule)
          }
        ]
      },
      {
        path: "history",
        canActivate: [AuthGuard],
        data: {
          title : "history",
        },
        children: [
          {
            path: "main",
            loadChildren: () => import("./views/history/history.module").then(m => m.HistoryModule)
          }
        ]
      },
      {
        path: "testakita",
        canActivate: [AuthGuard],
        data: {
          title : "testakita",
        },
        children: [
          {
            path: "main",
            loadChildren: () => import("./views/testakita/testakita.module").then(m => m.TestakitaModule)
          }
        ]
      },
      {
        path: "receive",
        canActivate: [AuthGuard],
        data: {
          title : "receive",
        },
        children: [
          {
            path: "management",
            loadChildren: () => import("./views/management/management.module").then(m => m.ManagementModule)
          }
        ]
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
