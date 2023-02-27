import Dexie, {Table} from 'dexie';
import {Form, Field, FieldItem} from "./app/components/form/form-types";
import {User} from "./app/store/models/user";

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
      users: '++id, name, email,password,token,rememberMe,agreementWithRights',
      forms: 'id,name,displayName,accessLevel,data',
      fields: 'id,formId ,name,display, type, ' +
        'description,inputFormat, displayFormat,' +
        ' min,max,minLength,maxLength,required,' +
        'requiredTrue,pattern,placeholder,repeatPassword,items'
    });
    this.version(11).stores({
      users: '++id, name, email,password,token,rememberMe,agreementWithRights',
      forms: 'id,name,displayName,accessLevel,data',
      fields: 'id,formId ,name,display, type, ' +
        'description,inputFormat, displayFormat,' +
        ' min,max,minLength,maxLength,required,' +
        'requiredTrue,pattern,placeholder,repeatPassword,items',
      fieldItems: 'id,fieldId ,key,value'
    });
    this.version(12).stores({
      users: '++id, name, email,password,token,rememberMe,agreementWithRights',
      forms: 'id,name,displayName,accessLevel,data,columnCount',
      fields: 'id,formId ,name,display, type, ' +
        'description,inputFormat, displayFormat,' +
        ' min,max,minLength,maxLength,required,index' +
        'requiredTrue,pattern,placeholder,repeatPassword,items',
      fieldItems: 'id,fieldId,formId,key,value'
    });
    this.version(13).stores({
      users: '++id,name,username, email,password',
      forms: 'id,name,displayName,accessLevel,data,columnCount',
      fields: 'id,formId ,name,display, type, ' +
        'description,inputFormat, displayFormat,' +
        ' min,max,minLength,maxLength,required,index' +
        'requiredTrue,pattern,placeholder,repeatPassword,items',
      fieldItems: 'id,fieldId,formId,key,value'
    });
    this.open();

    // request.onupgradeneeded = (event) => {
    //   const db = request.result;
    //   if (event.oldVersion < 1) {
    //     db.createObjectStore("store1");
    //   }
    //
    //   if (event.oldVersion < 2) {
    //     db.deleteObjectStore("store1");
    //     db.createObjectStore("store2");
    //   }
    //
    //   // etc. for version < 3, 4…
    // };
  }
}

export const db = new MyDatabase();
