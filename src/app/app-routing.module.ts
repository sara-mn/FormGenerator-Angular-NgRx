import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import FormRoutes from './components/form/form-routing'
import AuthRoutes from "./components/auth/auth-routing";
import {AuthGuard} from "./services/guard/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  ...FormRoutes,
  ...AuthRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: HomePage,
    //     data: {shouldDetach: true}
    //   },
    // ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
