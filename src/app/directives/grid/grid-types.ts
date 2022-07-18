import {Observable} from "rxjs";

export declare interface ComponentType<T> {
  new(...args: any[]): T;
}

export interface Table<T> {
  hasFilter?: boolean,
  hasSort?: boolean,
  hasPagination?: boolean,
  addable?: boolean,
  removable?: boolean,
  editable?: boolean,
  onAddEvent?: any,
  columns?: T[]
  //addComponent ? : ComponentType<any>,
  //getColumns$: Observable<T[]>,
}

export interface TableColumn {
  name?: string,
  type?: string,
  data?: string
}
