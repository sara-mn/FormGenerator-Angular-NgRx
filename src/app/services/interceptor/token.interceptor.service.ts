import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  token = localStorage.getItem('token');

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (this.token)
      return next.handle(request.clone({
        headers: request.headers.set('authorization', `bearer ${this.token}`)
      }))
    else
      return next.handle(request);
  }
}
