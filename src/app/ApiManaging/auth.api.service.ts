import {Injectable} from '@angular/core';
import {AsyncSubject, catchError, map, Observable, of, pluck, shareReplay, tap} from "rxjs";
import {HttpService} from "../services/http.service";
import {Token_Payload} from "../components/auth/auth-types";
import {ajax} from "rxjs/ajax";
import {Token, User} from "../store/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  base_url = 'http://localhost:8000';

  constructor(private httpService: HttpService) {
  }

  login(data: Token_Payload): Observable<Token> {
    return this.httpService.post<Token>(`${this.base_url}/auth/login`, data, {isAuthReq: true});
    // .pipe(shareReplay())
  }

  editProfile(id: string, data: User): Observable<any> {
    return this.httpService.patch(`${this.base_url}/user/${id}`, data,);
  }
}

// return ajax({
//   url: `${this.base_url}/auth/login`,
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: {
//     data
//   }
// }).pipe(
//   map((response) => console.log('response: ', response)),
//   catchError(error => {
//     console.log('error: ', error);
//     return of(error);
//   })
// );

