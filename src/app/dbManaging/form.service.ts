import {Injectable} from '@angular/core';
import {Field, FieldItem, Form} from "../components/form/form-types";
import {DBRequest} from "./types";
import {IndexableType} from "dexie";
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  from,
  map,
  mergeMap,
  Observable,
  switchAll,
  switchMap
} from "rxjs";
import {Guid as guid} from "guid-typescript";
import {db} from "../../db";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  subject$ = new BehaviorSubject<Form | Form[]>([]);
  errors: string[] = [];

  constructor() {
  }

  getAll(): Observable<Form[]> {
    const s = db.forms.toArray();
    return from(s)
  }

  getByName(req: DBRequest): Observable<Form | undefined> {
    return from(db.forms.where({'name' :req.params['name']}).first());
  }

  getById(req: DBRequest): Observable<Form> {
    const form$ = from(db.forms.where({'id':req.params['id'] }).first());
    const relatedFields$ = from(db.fields.where({'formId':req.params['id']}).toArray()).pipe(
      switchMap((fields: Field[]) => {
        const list: Observable<any>[] = [];
        fields.forEach((field) => {
          list.push(from(db.fieldItems.where({'fieldId':field.id}).toArray()).pipe(
            map((items) => ({
              ...field,
              items: items
            }))
          ));
        });
        return combineLatest(list, (...arg: Field[]) => {
          return [...arg];
        })
      })
    );
    return combineLatest([form$, relatedFields$], (form, fields) => {
      return {
        ...form,
        fields
      }
    })
  }

  create(form: Form): Observable<IndexableType> {
    this.getByName({params: form})
      .subscribe((result) => {
        if (result) {
          throw "this Form is exist!";
          return;
        }
      });

    const formId = this.createGuid();
    return this.saveForm(formId, form)
  }

  update(id: string, form: Form): Observable<number> {
    const cmdForm: Form = {
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }

    const fieldList = [];
    for (let field of form.fields || []) {
      fieldList.push({
        id: this.createGuid(),
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

    const getFormById$ = this.getById({params: {id}});
    const deleteFields$ = this.deleteFormFieldsBatch(id);
    const addFields$ = from(db.fields.bulkAdd(fieldList));
    const EditForm$ = from(db.forms.update(id, cmdForm));
    try {
      return combineLatest([getFormById$, deleteFields$, addFields$, EditForm$], (getFormByIdResult, deleteFieldsResult, addFieldsResult, EditFormResult) => {
        return EditFormResult;
      })
    } catch (error) {
      throw error;
    }
  }

  delete(id: string): Observable<void> {
    const deleteFields$  = this.deleteFormFieldsBatch(id);
    const deleteForm$ = from(db.forms.delete(id));
    try {
      return combineLatest([deleteFields$, deleteForm$], (deleteFieldsResult, deleteFormResult) => {
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

  saveForm(formId: string, form: Form): Observable<IndexableType> {
    const cmdForm: Form = {
      id: formId,
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel
    }

    const fieldList = [];
    const itemList = [];
    for (let field of form.fields || []) {
      const fieldId = this.createGuid();
      fieldList.push({
        id: fieldId,
        name: field.name,
        display: field.display,
        accessLevel: field.accessLevel,
        formId: formId,
        type: field.type,
        description: field.description,
        inputFormat: field.inputFormat,
        displayFormat: field.displayFormat,
        required: field.required,
        requiredTrue: field.requiredTrue,
        placeholder: field.placeholder,
        pattern: field.pattern,
        min: field.min,
        max: field.max,
        minLength: field.minLength,
        maxLength: field.maxLength,
        repeatPassword: field.repeatPassword
      });
      for (let item of field.items || []) {
        itemList.push({
          id: this.createGuid(),
          key: item.key,
          value: item.value,
          fieldId: fieldId
        })
      }
    }

    try {
      db.fieldItems.bulkAdd(itemList);
      db.fields.bulkAdd(fieldList);
      return from(db.forms.add(cmdForm));
    } catch (error) {
      throw error;
    }
  }

  createGuid() {
    return guid.create().toString();
  }
}

