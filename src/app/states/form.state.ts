import {Action} from '@ngrx/store';

const ADD_FORM = 'ADD_FORM';
const UPDATE_FORM = 'UPDATE_FORM';

export class AddFormAction implements Action {
  type = ADD_FORM;

  constructor(public payload: any) {
  }
}

export class UpdateFormAction implements Action {
  type = UPDATE_FORM;

  constructor(public payload: any) {
  }
}

type FormAction = AddFormAction | UpdateFormAction;

export function formReducer(state = [], action: FormAction) {
  switch (action.type) {
    case UPDATE_FORM:
      return state.map((item, idx) =>
        idx === action.payload.index ? action.payload.newForm : item
      );
    case ADD_FORM:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
