export interface Form {
  id?: string,
  name?: string,
  displayName?: string,
  accessLevel?: string,
}

export interface Field {
  id?: number,
  formId?: number,
  name?: string,
  display?: string,
  type?: string,
  description?: string,
  inputFormat?: string,
  displayFormat?: string
}
