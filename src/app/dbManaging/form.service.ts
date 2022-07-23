import {Injectable} from '@angular/core';
import {Form, FormWithFields} from "../components/form/form-types";
import {db} from "../../db";
import {DBRequest, KeyValue} from "./types";
import {IndexableType} from "dexie";
import {AsyncSubject, BehaviorSubject, combineLatest, from, Observable} from "rxjs";
import {Guid as guid} from "js-guid";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  subject$ = new BehaviorSubject<FormWithFields | FormWithFields[]>([]);
  errors: string[] = [];

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

  getById(req: DBRequest): Observable<any> {
    const formPromise = db.forms.where('id').equals(req.params['id']).first();
    const relatedFieldsPromise = db.fields.where('formId').equals(req.params['id']).toArray();
    return combineLatest([formPromise, relatedFieldsPromise], (form, fields) => {
      return {
        ...form,
        fields
      }
    })
  }

  create(form: FormWithFields): Observable<IndexableType> {
    this.getByName({params: form})
      .subscribe((result) => {
        if (result) {
          throw "this Form is exist!";
          return;
        }
      });

    const formId = guid.newGuid().toString();
    return this.saveForm(formId, form)
  }

  update(id: string, form: FormWithFields): Observable<number> {
    const cmdForm: Form = {
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }

    const fieldList = [];
    for (let field of form.fields) {
      fieldList.push({
        id: guid.newGuid().toString(),
        name: field.name,
        display: field.display,
        accessLevel: field.accessLevel,
        formId: id,
        type: field.type,
        description: field.description,
        inputFormat: field.inputFormat,
        displayFormat: field.displayFormat,
      })
    }

    const getFormById = this.getById({params: {id}});
    const deleteFields = this.deleteFormFieldsBatch(id);
    const addFields = from(db.fields.bulkAdd(fieldList));
    const EditForm = from(db.forms.update(id, cmdForm));
    try {
      return combineLatest([getFormById, deleteFields, addFields, EditForm], (getFormByIdResult, deleteFieldsResult, addFieldsResult, EditFormResult) => {
        return EditFormResult;
      })
    } catch (error) {
      throw error;
    }
  }

  delete(id: string): Observable<void> {
    const deleteFields = this.deleteFormFieldsBatch(id);
    const deleteForm = from(db.forms.delete(id));
    try {
      return combineLatest([deleteFields, deleteForm], (deleteFieldsResult, deleteFormResult) => {
        return deleteFormResult;
      })
    } catch (error) {
      throw error;
    }
  }

  deleteFormFieldsBatch(formId: string): AsyncSubject<boolean> {
    let deleteFieldsSubject$ = new AsyncSubject<boolean>();

    from(db.fields.where('formId').equals(formId).delete())
      .subscribe(() => {
        deleteFieldsSubject$.next(true);
        deleteFieldsSubject$.complete();
      });
    return deleteFieldsSubject$;
  }

  saveForm(formId: string, form: FormWithFields): Observable<IndexableType> {
    const cmdForm: Form = {
      id: formId,
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }

    const fieldList = [];
    for (let field of form.fields) {
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

}

