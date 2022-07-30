import {Routes} from '@angular/router';
import {FormListComponent} from "./form-list/form-list.component";
import {FormEntryComponent} from "./form-entry/form-entry.component";
import {FormDetailComponent} from "./form-detail/form-detail.component";
import {AuthGuard} from "../../services/guard/auth.guard";

const FormRoutes: Routes = [
  {
    path: 'forms',
    component: FormListComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'forms/entry',
    component: FormEntryComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'forms/detail',
    component: FormDetailComponent,
    canActivate : [AuthGuard]
  },
];

export default FormRoutes;
