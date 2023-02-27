import {AuthActions} from "../actions/auth.action";
import {createReducer, on} from "@ngrx/store";
import {AuthState} from "../app.state";

const initialState: AuthState = {
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
  userId: 0,
  token: {
    token: '',
    expiration: ''
  },
  loading: false,
  error: undefined,
  logoutMessage: ''
}

export const AuthReducer = createReducer(
  initialState,
  on(
    AuthActions.login,
    AuthActions.logout,
    AuthActions.register,
    (state) => ({...state, loading: true})
  ),
  on(AuthActions.loginSuccess,
    (state, action) => ({...state, loading: false, token: action})),
  on(AuthActions.registerSuccess,
    (state, action) => ({...state, loading: false, userId: action.userId})),
  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    (state, action) => ({...state, loading: false, error: action})),
  on(
    AuthActions.loginExpired,
    (state) => ({...state, loading: false, token: {token: '', expiration: ''}})),
   on(
    AuthActions.logoutSuccess,
    (state,action) => ({...state, loading: false ,logoutMessage: action.message})),
  on(
    AuthActions.logoutFailure,
    (state, action) => ({...state, loading: false, error: action})),
);

