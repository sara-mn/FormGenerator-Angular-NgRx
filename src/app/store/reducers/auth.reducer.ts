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
  error: undefined
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
    AuthActions.logoutSuccess,
    (state) => ({...state, loading: false, token: {token: '', expiration: ''}})),
  on(
    AuthActions.logoutFailure,
    (state, action) => ({...state, loading: false, error: action})),
);

