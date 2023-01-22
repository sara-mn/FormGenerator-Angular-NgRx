import Dexie, {Table} from 'dexie';
import {User} from './types';
import {Form, Field, FieldItem} from "./app/components/form/form-types";

export class MyDatabase extends Dexie {

  users!: Table<User>;
  forms!: Table<Form>;
  fields!: Table<Field>;
  fieldItems!: Table<FieldItem>;

  constructor() {
    super('myDatabase');
    this.version(9).stores({
      users: '++id, name, email,password,token,rememberMe,agreementWithRights', // Primary key and indexed props ++id
      forms: 'id,name,displayName,accessLevel,data',
      fields: 'id,formId ,name,display, type, description,inputFormat, displayFormat'
    });
    this.version(10).stores({
      users: '++id, name, email,password,token,rememberMe,agreementWithRights', // Primary key and indexed props ++id
      forms: 'id,name,displayName,accessLevel,data',
      fields: 'id,formId ,name,display, type, ' +
        'description,inputFormat, displayFormat,' +
        ' min,max,minLength,maxLength,required,' +
        'requiredTrue,pattern,placeholder,repeatPassword,items'
    });
    this.version(11).stores({
      users: '++id, name, email,password,token,rememberMe,agreementWithRights', // Primary key and indexed props ++id
      forms: 'id,name,displayName,accessLevel,data',
      fields: 'id,formId ,name,display, type, ' +
        'description,inputFormat, displayFormat,' +
        ' min,max,minLength,maxLength,required,' +
        'requiredTrue,pattern,placeholder,repeatPassword,items',
      fieldItems: 'id,fieldId ,key,value'
    });
    this.open();
  }
}

export const db = new MyDatabase();
