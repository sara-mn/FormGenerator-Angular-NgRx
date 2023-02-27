import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {User} from "../models/user";
import {UserService} from "../../dbManaging/user.service";
import {UserActions} from "../actions/user.action";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  constructor(private actions$: Actions,
              private userService: UserService,
              private router: Router,
              private alert: AlertService) {
  }

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(action => this.userService.getById(action.userId)
        .pipe(
          map((user: User) =>
            UserActions.getByIdSuccess({users : [user]})),
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
        tap((err) =>
          this.alert.error(err.message)))
    , {dispatch: false});

}
