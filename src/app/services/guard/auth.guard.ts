import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from "@angular/router";
import {LoginRegisterService} from "../login.register.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(public loginService: LoginRegisterService,
              public router: Router) { }

  canActivate(): boolean | UrlTree {
    return this.loginService.isUserLoggedIn() ||
      this.router.parseUrl('login');
  }
}
