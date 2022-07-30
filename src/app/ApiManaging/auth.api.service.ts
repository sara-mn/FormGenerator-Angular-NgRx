import {Injectable} from '@angular/core';
import {AsyncSubject, catchError, map, Observable, of, pluck, shareReplay, tap} from "rxjs";
import {HttpService} from "../services/http.service";
import {User_CPol} from "../../types";
import {Token_Payload} from "../components/auth/auth-types";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  //base_url = 'http://88.135.36.18:7005/api';
  base_url = 'http://localhost:8000';
  userSubject$ = new AsyncSubject<User_CPol>();

  constructor(private httpService: HttpService) {
  }

  verifyToken(token: string): Observable<any> {
    return this.httpService.post(`${this.base_url}/auth/verify`, {token});
  }

  login(data: Token_Payload): Observable<any> {
    return this.httpService.post(`${this.base_url}/auth/login`, data)
      .pipe(shareReplay());
  }

  editProfile(id: string, data: User_CPol): Observable<any> {
    return this.httpService.patch(`${this.base_url}/user/${id}`, data,);//autorization
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
