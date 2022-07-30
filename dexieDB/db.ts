// import Dexie, {Table} from 'dexie';
// import {User} from './types';
// import {Form, Field} from "./app/components/form/form-types";
//
// export class MyDatabase extends Dexie {
//
//   users!: Table<User>;
//   forms!: Table<Form>;
//   fields!: Table<Field>;
//
//   constructor() {
//     super('myDatabase');
//     this.version(13).stores({
//       users: '++id, name, email,password,token,rememberMe,agreementWithRights', // Primary key and indexed props ++id
//       forms: 'id,name,displayName,accessLevel,data',
//       fields: 'id,formId ,name,display, type, description,inputFormat, displayFormat'
//     });
//     this.open();
//   }
// }
//
// export const db = new MyDatabase();
