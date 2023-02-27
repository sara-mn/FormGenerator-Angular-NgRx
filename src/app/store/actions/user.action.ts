import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Register, User} from "../models/user";

export const UserActions = createActionGroup({
  source: 'USER',
  events: {
    'GET USER BY ID': props<{ userId: number }>(),

    'GET BY ID SUCCESS': props<{ users: User[] }>(),

    'GET BY ID FAILURE': props<Error>()
  }
});

// export const userAction = createAction('[USER]', props<{ user: User }>())
