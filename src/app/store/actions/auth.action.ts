import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {Login, Register, Token} from "../models/user";

export enum AuthActionTypes {
  REGISTER = '[AUTH] REGISTER',
  REGISTER_SUCCESS = '[AUTH] REGISTER SUCCESS',
  REGISTER_FAILURE = '[AUTH] REGISTER FAILURE',

  LOGIN = '[AUTH] LOGIN',
  LOGIN_SUCCESS = '[AUTH] LOGIN SUCCESS',
  LOGIN_FAILURE = '[AUTH] LOGIN FAILURE',
  LOGIN_EXPIRED = '[AUTH] LOGIN EXPIRED',

  LOGOUT = '[AUTH] LOGOUT',
  LOGOUT_SUCCESS = '[AUTH] LOGOUT SUCCESS',
  LOGOUT_FAILURE = '[AUTH] LOGOUT FAILURE',
}

export const AuthActions = createActionGroup({
  source: 'AUTH',
  events: {
    'REGISTER': props<Register>(),  // type => '[AUTH] REGISTER'

    'REGISTER SUCCESS': props<{ userId: number }>(),

    'REGISTER FAILURE': props<Error>(),

    'LOGIN': props<Login>(),

    'LOGIN SUCCESS': props<Token>(),

    'LOGIN FAILURE': props<Error>(),

    'LOGIN EXPIRED': emptyProps(),

    'LOGOUT': emptyProps(),

    'LOGOUT SUCCESS': props<{ message: string }>(),

    'LOGOUT FAILURE': props<Error>()
  }
});

export const RegisterAction = createAction(
  AuthActionTypes.REGISTER,
  props<Register>()
);

export const RegisterSuccessAction = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<Token>()
);

export const RegisterFailureAction = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<Error>()
);

export const LoginAction = createAction(
  AuthActionTypes.LOGIN,
  props<Login>()
);

export const LoginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<Token>()
);

export const LoginFailureAction = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<Error>()
);

export const LoginExpiredAction = createAction(
  AuthActionTypes.LOGIN_EXPIRED,
);

export const LogoutAction = createAction(
  AuthActionTypes.LOGOUT,
);

export const LogoutSuccessAction = createAction(
  AuthActionTypes.LOGOUT_SUCCESS,
  props<Token>()
);

export const LogoutFailureAction = createAction(
  AuthActionTypes.LOGOUT_FAILURE,
  props<Error>()
);
