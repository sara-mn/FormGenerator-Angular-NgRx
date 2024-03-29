import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {AuthActions} from "../actions/auth.action";
import {LoginRegisterService} from "../../services/login.register.service";
import {Token} from "../models/user";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {AppState} from "../app.state";
import { Store } from '@ngrx/store';
import {UserActions} from "../actions/user.action";


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: LoginRegisterService,
    private router: Router,
    private alert: AlertService,
    private store: Store<AppState>
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action => this.authService.login(action)
        .pipe(
          map((token: Token) => AuthActions.loginSuccess(token)),
          catchError((error: string) =>
            of(AuthActions.loginFailure({name: 'error', message: error}))))
      )));

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/')
        }))
    , {dispatch: false});

  loginFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((err) =>
          this.alert.error(err.message)))
    , {dispatch: false});

  loginExpired$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginExpired),
        tap(() =>
          this.alert.error('your login token expired!')))
    , {dispatch: false});


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(action => this.authService.register(action)
        .pipe(
          map((userId: number) => AuthActions.registerSuccess({userId})),
          catchError((error: string) => of(AuthActions.registerFailure({name: 'error', message: error}))))
      )));

  registerSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/login')
        }))
    , {dispatch: false});

  registerFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap((err) =>
          this.alert.error(err.message)))
    , {dispatch: false});

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => this.authService.logout()
          .pipe(
            map(() =>
              AuthActions.logoutSuccess({ message: 'you are logged out!'})),
            catchError((error: string) =>
              of(AuthActions.logoutFailure({name: 'error', message: error}))))
        )));

  logoutSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap((result) => {
          this.alert.success(result.message),
          this.store.dispatch(UserActions.clear())
          this.router.navigateByUrl('/login')
        }))
    , {dispatch: false});

  logoutFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logoutFailure),
        tap((err) =>
          this.alert.error(err.message)))
    , {dispatch: false});
}
