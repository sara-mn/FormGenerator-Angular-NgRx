import {Injectable} from '@angular/core';
import {AuthApiService} from "../ApiManaging/auth.api.service";
import {AppState, User} from "../../types";
import {distinctUntilChanged, from, map, Observable, switchMap, take, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {Router, UrlTree} from "@angular/router";
import {JwtProvider} from "../jwtProvider";
import {Login, Register, Token_Payload} from "../components/auth/auth-types";
import {UserService} from "../dbManaging/user.service";
import {LoginAction} from "../states/user.state";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  currentToken = localStorage.getItem('token');
  jwtProvider = new JwtProvider();

  constructor(private userService: UserService,
              private authApi: AuthApiService,
              private store: Store<AppState>,
              private router: Router) {
  }

  login(cmd: Login): Observable<User> {
    return this.userService.getByEmailAndPassword({params: cmd})
      .pipe(
        take(1),
        switchMap((user: User) => {
          const jwtPayload: Token_Payload = {
            payload: {
              userId: user.id
            }
          };
          return this.authApi.login(jwtPayload)
            .pipe(tap((result) => this.setLocalStorage(result.token)))
        }))

    // tap((user) => {
    //   const actionPayload = {id: user.id};
    //   this.store.dispatch(new LoginAction(actionPayload))
    // })
  }

  register(cmd: User): Observable<any> {
    return this.userService.create(cmd)
  }

  isUserLoggedIn() {
    let currentUser;
    const user$: Observable<User> = this.store.select('user') //(state : AppState) => state.user
    user$.subscribe({
      next: user => this.userService.userSubject$.next(user),
      complete: () => this.userService.userSubject$.complete(),
    })
    // .pipe(
    //   take(1),
    //   distinctUntilChanged(),
    //   map(user => {
    //
    // })).subscribe();
    return true;
  }

  setLocalStorage(token: string) {
    localStorage.setItem('token', token)
  }

//
//   let token = this.currentToken;
//   let k;
//   if (!!token) {
//   this.authApi.verify(token)
// .pipe(
//     switchMap((result) => {
//   return this.userService.getById(result.payload.userId);
// })
// )
// .subscribe({
//   next: (user) => {
//     const userAction = new LoginAction(user);
//     this.store.dispatch(userAction);
//   },
//   error: (err) => {}
// });
// }
// return true

  // loginAction(token: string): Observable<any> {
  //   return this.authApi.verifyToken(token).pipe(
  //     take(1),
  //     tap((result: User) => {
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
