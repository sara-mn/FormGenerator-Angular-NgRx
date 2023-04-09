import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import AuthRoutes from "./components/auth/auth-routing";
import {AuthGuard} from "./services/guard/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FormModule} from "./components/form/form.module";
import {FormListComponent} from "./components/form/form-list/form-list.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'forms',
    component: FormListComponent,
    loadChildren: () => import('./components/form/form.module').then(m => m.FormModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
   // canLoad: [AuthGuard] => because of we use lazyLoad for this module, canLoad never been fire
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  ...AuthRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


// RouterModule.forChild([
//   {
//     path: '',
//     component: HomePage,
//     data: {shouldDetach: true}
//   },
// ]),
