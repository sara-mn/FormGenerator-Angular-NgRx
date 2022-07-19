import {Injectable} from '@angular/core';
import {Form, Field} from "../components/form/form-types";
import {db} from "../../db";
import {DBRequest, KeyValue} from "./types";
import {IndexableType} from "dexie";
import {from, Observable} from "rxjs";
import {Guid as guid} from "js-guid";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  getAll(): Observable<Form[]> {
    const s = db.forms.toArray();
    //from(s).subscribe(console.log)
    return from(s)
  }

   getByName(req: DBRequest): Observable<Form | undefined> {
    return from(db.forms.where('name').equals(req.params['name']).first());
  }

  async getById(req: DBRequest) {
    const form = await db.forms.get((e: KeyValue) => e['id'] === req.params['id']);
    console.log(await this.getAll());

    if (form)
      return form;
    else
      throw 'form not found'
  }

  create(form: FormWithFields): Observable<IndexableType> {
    this.getByName({params: form})
      .subscribe((result) => {
        if(result) {
          throw "this Form is exist!";
          return;
        }
      });

    const formId = guid.newGuid().toString();
    const cmdForm: Form = {
      id: formId,
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }

    const fieldList = [];
    for(let field of form.fields){
      fieldList.push({
        id: guid.newGuid().toString(),
        name: field.name,
        display: field.display,
        accessLevel: field.accessLevel,
        formId: formId,
        type: field.type,
        description: field.description,
        inputFormat: field.inputFormat,
        displayFormat: field.displayFormat,
      })
    }

    try {
      db.fields.bulkAdd(fieldList);
      return from(db.forms.add(cmdForm));
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, form: Form): Promise<void> {
    const cmd: Form = {
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }
    try {
      await db.forms.update(id, cmd); // 0 or 1 return
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await db.forms.delete(id); // 0 or 1 return
    } catch (error) {
      throw error;
    }
  }

}

interface FormWithFields extends Form {
  fields : Field[]
}
