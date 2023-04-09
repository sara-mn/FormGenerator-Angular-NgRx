import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from 'rxjs';
import {LoginRegisterService} from "../login.register.service";

type ActivatedType = Observable<boolean> | Promise<boolean> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(public loginService: LoginRegisterService,
              public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ActivatedType {
    return this.loginService.isUserLoggedIn() ||
      this.router.parseUrl('login');
  }

  canActivateChild(): boolean | UrlTree {
    return this.loginService.isUserLoggedIn() ||
      this.router.parseUrl('login');
  }

  canLoad(route: Route, segments: UrlSegment[]): ActivatedType {
    return this.loginService.isUserLoggedIn()
  }
}
