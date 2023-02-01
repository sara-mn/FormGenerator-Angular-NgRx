import {Action} from "@ngrx/store";
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

export class RegisterAction implements Action{
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload : Register) {
  }
}

export class RegisterSuccessAction implements Action{
  readonly type = AuthActionTypes.REGISTER_SUCCESS

  constructor(public payload : Token) {
  }
}

export class RegisterFailureAction implements Action{
  readonly type = AuthActionTypes.REGISTER_FAILURE;

  constructor(public payload : Error) {
  }
}

export class LoginAction implements Action{
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload : Login) {
  }
}

export class LoginSuccessAction implements Action{
  readonly type = AuthActionTypes.LOGIN_SUCCESS

  constructor(public payload : Token) {
  }
}

export class LoginFailureAction implements Action{
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload : Error) {
  }
}

export class LoginExpiredAction implements Action{
  readonly type = AuthActionTypes.LOGIN_EXPIRED;
}

export class LogoutAction implements Action{
  readonly type = AuthActionTypes.LOGOUT;
}


export class LogoutSuccessAction implements Action{
  readonly type = AuthActionTypes.LOGOUT_SUCCESS

  constructor(public payload : Token) {
  }
}

export class LogoutFailureAction implements Action{
  readonly type = AuthActionTypes.LOGOUT_FAILURE;

  constructor(public payload : Error) {
  }
}

export type UserAction =
  RegisterAction |
  RegisterSuccessAction |
  RegisterFailureAction |
  LoginAction |
  LoginSuccessAction |
  LoginFailureAction |
  LoginExpiredAction |
  LogoutAction |
  LogoutSuccessAction |
  LogoutFailureAction;
