import {KeyValue} from "./app/dbManaging/types";

export interface IProps extends KeyValue {
}

export interface IState extends KeyValue {
}

export interface IconProp {
}

export interface User {
  id?: string,
  name?: string,
  email?: string,
  mobile?: string,
  password?: string,
  token?: string,
  role?: string, //superAdmin , admin , user
  rememberMe?: boolean,
  agreementWithRights?: boolean
}

export interface User_CPol {
  id?: string,
  username?: string,
  password?: string,
  token?: string,
  first_name?:string,
  last_name?:string,
  bio?:string,
}

export interface AppState {
  user: User_CPol;
};
