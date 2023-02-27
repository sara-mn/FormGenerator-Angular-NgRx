import {createReducer, on} from "@ngrx/store";
import {UserState} from "../app.state";
import {UserActions} from "../actions/user.action";

const initialUserState: UserState = {
  users: [],
  error: undefined,
  loading: false
}

export const UserReducer = createReducer(initialUserState,
  on(UserActions.getUserById, (state) => ({...state , loading: true})),
  on(UserActions.getByIdSuccess, (state, action) => ({...state, users: action.users, loading: false})),
  on(UserActions.getByIdFailure, (state, action) => ({...state, error: action, loading: false}))
)
