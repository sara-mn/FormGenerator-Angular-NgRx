import {Login, Register, Token} from "../models/user";
import {AuthActionTypes, UserAction} from "../actions/user.action";

export interface UserState {
  login: Login;
  register: Register,
  token: Token;
  loading: boolean;
  error?: Error
}

const initialState : UserState = {
  register: {
    email: '',
    mobile: '',
    password: '',
  },
  login: {
    email: '',
    mobile: '',
    password: '',
  },
  token: {
    token: '',
    expiration: ''
  },
  loading: false,
  error: undefined
}

export function AuthReducer(state: UserState = initialState, action: UserAction) : UserState {

  switch (action.type) {
    case AuthActionTypes.REGISTER:
      return {...state, loading: true};
    case AuthActionTypes.REGISTER_SUCCESS:
      return {...state, loading: false, token: action.payload}
    case AuthActionTypes.REGISTER_FAILURE:
      return {...state, loading: false, error: action.payload}
    case AuthActionTypes.LOGIN:
      return {...state, loading: true};
    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, loading: false, token: action.payload}
    case AuthActionTypes.LOGIN_FAILURE:
      return {...state, loading: false, error: action.payload}
    case AuthActionTypes.LOGIN_EXPIRED:
      return {...state, loading: false, token: {token: '', expiration: ''}}
    case AuthActionTypes.LOGOUT:
      return {...state, loading: true}
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {...state, loading: false, token: {token: '', expiration: ''}}
    case AuthActionTypes.LOGOUT_FAILURE:
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }
}
