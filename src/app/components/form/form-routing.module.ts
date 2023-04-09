import {NgModule} from '@angular/core';
import {FormEntryComponent} from "./form-entry/form-entry.component";
import {FormDetailComponent} from "./form-detail/form-detail.component";
import {FormPreviewComponent} from "./form-preview/form-preview.component";
import {RouterModule, Routes} from '@angular/router';
import {CanFormDeactivateGuard} from "../../services/guard/can-form-deactivate.guard";
import {OpenDialogComponent} from "../../shared/open.dialog/open.dialog.component";
import {Dialog} from "../../shared/open.dialog/types";
import {FormResolver} from "../../services/resolver/form.resolver";
import {Form} from "./form-types";

const FormRoutes: Routes = [
  {
    path: 'create',
    component: OpenDialogComponent,
    data: {component: FormEntryComponent} as Dialog<FormEntryComponent, Form>,
    canDeactivate: [CanFormDeactivateGuard]
  },
  {
    path: 'edit/:id',
    component: OpenDialogComponent,
    data: {
      component: FormEntryComponent,
      config: {},
    } as Dialog<FormEntryComponent, Form>,
    canDeactivate: [CanFormDeactivateGuard],
    resolve: { data : FormResolver}
  },
  {
    path: 'detail/:id',
    component: OpenDialogComponent,
    data: {component: FormDetailComponent} as Dialog<FormDetailComponent>
  },
  {
    path: 'preview/:id',
    component: OpenDialogComponent,
    data: {component: FormPreviewComponent} as Dialog<FormPreviewComponent>
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(FormRoutes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
