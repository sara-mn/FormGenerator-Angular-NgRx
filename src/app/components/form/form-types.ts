export interface Form {
  id?: string,
  name?: string,
  displayName?: string,
  accessLevel?: string,
}

export interface Field {
  id?: string,
  formId?: string,
  name?: string,
  display?: string,
  type?: string,
  description?: string,
  inputFormat?: string,
  displayFormat?: string,
  accessLevel?: string,
}

export interface FormWithFields extends Form {
  fields: Field[]
}
