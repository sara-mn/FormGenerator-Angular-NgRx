import {createReducer, on} from "@ngrx/store";
import {UserState} from "../app.state";
import {UserActions} from "../actions/user.action";

const initialUserState: UserState = {
  user: undefined,
  error: undefined,
  loading: false
}

export const UserReducer = createReducer(initialUserState,
  on(UserActions.getUserById, (state) => ({...state, loading: true})),
  on(UserActions.getByIdSuccess, (state, action) => ({...state, user: action, loading: false})),
  on(UserActions.getByIdFailure, (state, action) => ({...state, error: action, loading: false})),
  on(UserActions.clear, () => ({} as UserState))
)
