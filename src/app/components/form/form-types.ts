export interface Form {
  id?: string,
  name?: string,
  displayName?: string,
  accessLevel?: string,
  fields?: Field[],
  columnCount?: number
}

export interface Field {
  id?: string,
  formId?: string,
  name: string,
  display?: string,
  type?: string,
  description?: string,
  inputFormat?: string,
  displayFormat?: string,
  accessLevel?: string,
  required?: boolean,
  requiredTrue?: boolean,
  placeholder?: string,
  pattern?: string,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  repeatPassword?: boolean,
  items?: FieldItem[],
  index: number,
  _dragged?:boolean
}

export interface FormWithFields extends Form {
  fields?: Field[]
}

export interface FieldItem {
  id?: string,
  formId?: string,
  fieldId?: string,
  key?: any,
  value?: any
}
