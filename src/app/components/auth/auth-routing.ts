import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "../../services/guard/auth.guard";

const AuthRoutes: Routes = [
  {
    path:'login',
    component: LoginComponent,
  }, {
    path:'register',
    component: RegisterComponent
  }, {
    path:'profile',
    component: ProfileComponent,
    canActivate : [AuthGuard]
  },
];

export default AuthRoutes;
