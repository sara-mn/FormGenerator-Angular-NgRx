
export interface Error_Directive_Input {
  errors : any[];
  invalid : boolean;
  dirty : boolean;
  touched : boolean;
}

export interface Error {
  errorTitle?: string;
  returnedObject?: object;
  errorMessage?: string ;
}
