import { createSelector } from "@ngrx/store";
import {AppState, AuthState} from "../app.state";

export const selectAuth = (state: AppState) => state.auth;

export const tokenSelector = createSelector(
  selectAuth,
  (auth: AuthState) => auth.token
);

export const userIdSelector = createSelector(
  selectAuth,
  (auth: AuthState) => auth.userId
);

export const authLoadingSelector = createSelector(
  selectAuth,
  (auth: AuthState) => auth.loading
);

export const authErrorSelector = createSelector(
  selectAuth,
  (auth: AuthState) => auth.error
);
