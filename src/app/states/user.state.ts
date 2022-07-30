import {Action} from '@ngrx/store';
import {User} from "../../types";

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const EDIT_PROFILE = 'EDIT_PROFILE';

const initialState: User = {};

export class RegisterAction implements Action {
  type = REGISTER;

  constructor(public payload: User) {
  }
}

export class LoginAction implements Action {
  type = LOGIN;

  constructor(public payload: User) {
  }
}

export class EditProfileAction implements Action {
  type = EDIT_PROFILE;

  constructor(public payload: User) {
  }
}

type UserAction = RegisterAction | LoginAction | EditProfileAction;

export function UserReducer(state= initialState, action: UserAction ){
  switch (action.type) {
    case LOGIN:
      return {...state, ...action.payload};
    case REGISTER:
      return {...state, ...action.payload};
    case EDIT_PROFILE:
      return {...state, ...action.payload};
    default:
      return {...state};
  }
}
