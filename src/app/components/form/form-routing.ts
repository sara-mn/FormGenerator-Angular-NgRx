import {Routes} from '@angular/router';
import {FormListComponent} from "./form-list/form-list.component";
import {FormEntryComponent} from "./form-entry/form-entry.component";
import {FormDetailComponent} from "./form-detail/form-detail.component";

const FormRoutes: Routes = [
  {
    path:'forms',
    component: FormListComponent
  }, {
    path:'forms/entry',
    component: FormEntryComponent
  }, {
    path:'forms/detail',
    component: FormDetailComponent
  },
];

export default FormRoutes;
