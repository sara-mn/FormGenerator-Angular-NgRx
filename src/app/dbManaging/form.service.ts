import {Injectable} from '@angular/core';
import {Form, Field} from "../components/form/form-types";
import {db} from "../../db";
import {DBRequest, KeyValue} from "./types";
import {IndexableType} from "dexie";
import {from, Observable} from "rxjs";

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

  create(form: Form): Observable<IndexableType> {
    this.getByName({params: form})
      .subscribe((result) => {
        if(result)
          throw "this Form is exist!"
      });
    const cmd: Form = {
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }
    try {
      return from(db.forms.add(cmd));
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
