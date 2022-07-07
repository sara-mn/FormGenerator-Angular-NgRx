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
  password?: string,
  token?: string,
  role?: string, //superAdmin , admin , user
  rememberMe?: boolean,
  agreementWithRights?: boolean
}
