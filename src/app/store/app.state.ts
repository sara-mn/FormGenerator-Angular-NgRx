import {Login, Register, Token, User} from "./models/user";

export interface AuthState {
  login: Login;
  register: Register,
  userId: number,
  token: Token;
  loading: boolean;
  error?: Error;
  logoutMessage?: string;
}

export interface UserState {
  user?: User;
  loading: boolean;
  error?: Error
}

export interface AppState {
  readonly auth : AuthState
  readonly user : UserState
};
