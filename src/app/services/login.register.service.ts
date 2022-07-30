import {Injectable} from '@angular/core';
import {AuthApiService} from "../ApiManaging/auth.api.service";
import {AppState, User, User_CPol} from "../../types";
import {from, Observable, take, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {Router, UrlTree} from "@angular/router";
import {JwtProvider} from "../jwtProvider";
import {Login, Register} from "../components/auth/auth-types";
import {UserService} from "../dbManaging/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  currentToken = localStorage.getItem('token');
  jwtProvider = new JwtProvider();

  constructor(private userService: UserService,
              private store: Store<AppState>,
              private router: Router) {
  }

  login(cmd: Login): Observable<User> {
    return this.userService.getByEmailAndPassword({params: cmd})
      .pipe(
        tap((user: User) => {
          const jwtPayload = {
            userId: user.id
          };
          const token = this.jwtProvider.generate(jwtPayload);
          this.setLocalStorage(token)
        })
      )
  }

  register(cmd: User): Observable<any> {
    return this.userService.create(cmd)
  }

  isUserLoggedIn() {
    let token = this.currentToken;
    let k;
    if (!!token) {
      k = this.jwtProvider.verify(token);

    }
    console.log(k)
    return true
  }

  setLocalStorage(token: string) {
    localStorage.setItem('token', token)
  }

  // loginAction(token: string): Observable<any> {
  //   return this.authApi.verifyToken(token).pipe(
  //     take(1),
  //     tap((result: User_CPol) => {
  //       const userAction = {
  //         type: 'LOGIN',
  //         payload: result
  //       }
  //       this.store.dispatch(userAction);
  //       localStorage.setItem('token', token)
  //     }));
  // }
  //
  // openDialog(): UrlTree {
  //   // const dialogRef = this.dialog.open(LoginComponent, {
  //   //   width: '250px'
  //   // });
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   from(this.router.navigate(['.'], {relativeTo: this.route})).subscribe();
  //   // });
  //   return this.router.parseUrl('login');
  // }
}
