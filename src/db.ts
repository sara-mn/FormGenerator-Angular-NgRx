import Dexie, {Table} from 'dexie';
import {User} from './types';
import {Form, FormField, Field} from "./app/form/form-types";

export class MyDatabase extends Dexie {

  users!: Table<User>;
  forms!: Table<Form>;
  formField!: Table<FormField>;
  fields!: Table<Field>;

  constructor() {
    super('myDatabase');
    this.version(13).stores({
      users: '++id, name, email,password,token,rememberMe,agreementWithRights', // Primary key and indexed props
      forms: '++id,name,displayName,accessLevel,data',
      formField: '++id,formId,fieldId,isRequired,accessLevel',
      fields: '++id,name,display, type, description,inputFormat, displayFormat'
    });
    this.open();
  }
}

export const db = new MyDatabase();
