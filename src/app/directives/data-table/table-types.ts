import {Observable} from "rxjs";

export interface Table<T> {
  hasFilter?: boolean,
  hasSort?: boolean,
  hasPagination?: boolean,
  addable?:boolean,
  removable?: boolean,
  editable?:boolean,
  onAddEvent?: any,
  onCloseDialog$: Observable<any>,
  getColumns$: Observable<T[]>,
}

export interface TableColumn {
  name?: string,
  type?: string,
  data?: string
}
