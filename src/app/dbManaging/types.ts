import * as dexie from 'Dexie';

export interface KeyValue {
    [key: string]: any;
}

export interface EnumType{
    key?: string;
    display?:string;
    value?: number
}

export interface DBRequest{
    params : KeyValue
}

export interface DBResponse {
}

export interface DBEntity extends dexie.Table<object, dexie.IndexableType> {
}

