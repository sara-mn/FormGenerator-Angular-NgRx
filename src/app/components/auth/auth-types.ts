export interface Login {
  username: string;
  password: string;
}
export interface Register {
  username: string;
  password: string;
}

export interface Token_Payload {
  payload :{
    userId?: string;
  }
}

