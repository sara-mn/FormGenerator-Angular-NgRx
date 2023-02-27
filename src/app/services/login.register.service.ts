import {Injectable} from '@angular/core';
import {AuthApiService} from "../ApiManaging/auth.api.service";
import {catchError, distinctUntilChanged, from, map, Observable, of, switchMap, take, tap} from "rxjs";
import {Router, UrlTree} from "@angular/router";
import {UserService} from "../dbManaging/user.service";
// import {LoginAction} from "../states/user.state";
import {Login, Register, Token, User} from '../store/models/user';
import {StorageService} from "./storage.service";
import {Store} from '@ngrx/store';
import {AppState} from "../store/app.state";
import {UserActions} from "../store/actions/user.action";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private userService: UserService,
              private authApi: AuthApiService,
              private storageService: StorageService,
              private store: Store<AppState>) {
  }

  login(cmd: Login): Observable<Token> {
    return this.userService.getByEmailAndPassword({params: cmd})
      .pipe(
        take(1),
        switchMap((user: User) => {
          const jwtPayload = {
            payload: {
              userId: user.id
            }
          };
          return this.authApi.login(jwtPayload)
            .pipe(tap((result) => {
              const userId = jwtPayload.payload.userId;
              this.storageService.setStorage([{key: 'token', value: result.token} , {key:'userId', value: userId}]);

              if (userId)
                this.store.dispatch(UserActions.getUserById({userId}));
            }))
        }),
        catchError(err => {
          throw 'error occur: ' + err?.message;
        }))
  }

  register(cmd: Register): Observable<any> {
    return this.userService.create(cmd)
      .pipe(tap((result) => {
        this.storageService.setStorage([{key: 'userId', value: result}]);
      }))
  }

  logout(): Observable<any> {
    return of(this.storageService.clearStorage());
  }

  isUserLoggedIn() {
    const hasToken = this.storageService.getStorage('token');
    return !!hasToken;
  }

// let currentUser;
//     const user$: Observable<User> = this.store.select('user') //(state : AppState) => state.user
//     user$.subscribe({
//       next: user => this.userService.userSubject$.next(user),
//       complete: () => this.userService.userSubject$.complete(),
//     })
//     .pipe(
//       take(1),
//       distinctUntilChanged(),
//       map(user => {
//
//     })).subscribe();

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
