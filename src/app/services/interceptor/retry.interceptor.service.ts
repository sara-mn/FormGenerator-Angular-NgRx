import {Injectable} from '@angular/core';
import {delay, flatMap, map, Observable, of, retryWhen, throwError} from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetryInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen(err$ =>
          err$
            .pipe(
              flatMap(err => {
                if (err instanceof HttpErrorResponse
                  && err.status < 600 && err.status > 499) {
                  return of(null)
                    .pipe(delay(500));
                }
                return throwError(err);
              }))
        ));
  }
}

// Observable<HttpEvent<any>> {
//   console.log('->Interceptor');
//   console.log(request);
//   return next.handle(request).pipe(
//     map((event: HttpEvent<any>) => {
//       const response = event as HttpResponseBase;
//       console.log('<-Interceptor');
//       console.log(response);
//       return event;
//     })
//   )
// }
