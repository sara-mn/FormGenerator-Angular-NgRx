import { createSelector } from "@ngrx/store";
import {AppState, UserState} from "../app.state";

export const usersSelector = (state: AppState) => state.user;

export const userSelector = createSelector(
  usersSelector,
  (user: UserState) => user.users[0]
);

export const userLoadingSelector = createSelector(
  usersSelector,
  (user: UserState) => user.loading
);
