export interface User {
  id?: string,
  name?: string,
  email?: string,
  mobile?: string,
  password?: string,
  token?: string,
  role?: string, //superAdmin , admin , user
}

export interface Register extends User{
  rememberMe?: boolean,
  agreementWithRights?: boolean
}

export interface Login extends User{

}

export interface Token {
  token: string;
  expiration : string;
}
