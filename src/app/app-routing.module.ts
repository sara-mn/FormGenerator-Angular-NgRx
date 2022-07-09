import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import FormRoutes from './components/form/form-routing'

const routes: Routes = [
  ...FormRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
