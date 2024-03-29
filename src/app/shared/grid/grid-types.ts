export declare interface ComponentType<T> {
  new(...args: any[]): T;
}

export interface Table<T> {
  hasFilter?: boolean;
  hasSort?: boolean;
  hasPagination?: boolean;
  addable?: boolean;
  removable?: boolean;
  editable?: boolean;
  onAddEvent?: any;
  isHeaderSticky?:boolean;
  hasFooter?:boolean;
  isFooterSticky?:boolean;
  columns?:Column[];
  rows?: T[]
}

export interface Column {
  key:string;
  display:string;
  type?: string;
}
