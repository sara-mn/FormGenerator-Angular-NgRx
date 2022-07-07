export interface Table {
  hasFilter?: boolean,
  hasSort?: boolean,
  hasPaginaion?: boolean,
  addable?:boolean,
  removeable?: boolean,
  editable?:boolean,
  onAddEvent?: any,
  columns: TableColumn[],
}

export interface TableColumn {
  name?: string,
  type?: string,
  data?: string
}
