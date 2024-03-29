import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {User} from "../models/user";
import {UserService} from "../../dbManaging/user.service";
import {UserActions} from "../actions/user.action";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {AuthActions} from "../actions/auth.action";
import {AppState} from "../app.state";
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  userId: string | null;
  constructor(private actions$: Actions,
              private userService: UserService,
              private router: Router,
              private store: Store<AppState>,
              private storageService: StorageService,
              private alert: AlertService) {
    this.userId = this.storageService.getStorage('userId');
  }

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(action => this.userService.getById(action.userId)
        .pipe(
          map((user: User) =>
            UserActions.getByIdSuccess(user)),
          catchError((error: string) =>
            of(UserActions.getByIdFailure({name: 'error', message: error})))))
    ));

  getByIdSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.getByIdSuccess),
        tap(() => {}))
    , {dispatch: false});

  getByIdFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.getByIdFailure),
        tap((err) => {
          this.store.dispatch(AuthActions.logout())
          this.alert.error(err.message);
        }))
    , {dispatch: false});

  clear$ = createEffect(() =>
      this.actions$.pipe(ofType(UserActions.clear))
    , {dispatch: false});

}
