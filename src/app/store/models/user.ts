export interface User {
  id?: number,
  name?: string,
  username?: string
  email?: string,
  mobile?: string,
  password?: string,
  role?: string, //superAdmin , admin , user
}

export interface Register extends User {
  rememberMe?: boolean,
  agreementWithRights?: boolean
}

export interface Login extends User {
  token?: Token
}

export interface Token {
  token: string;
  expiration: string;
}
