import {Injectable} from '@angular/core';
import {Field, Form} from "../components/form/form-types";
import {DBRequest} from "./types";
import {IndexableType} from "dexie";
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  from,
  map,
  Observable,
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
    return from(db.forms.where({'name': req.params['name']}).first());
  }

  getById(req: DBRequest): Observable<Form> {
    const form$ = from(db.forms.where({'id': req.params['id']}).first());
    const relatedFields$ = from(db.fields.where({'formId': req.params['id']}).sortBy('index')).pipe(
      switchMap((fields: Field[]) => {
        const list: Observable<any>[] = [];
        fields.forEach((field) => {
          list.push(from(db.fieldItems.where({'fieldId': field.id}).toArray()).pipe(
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
    const data = this.prepareData(formId, form);
    try {
      db.fieldItems.bulkAdd(data.itemList);
      db.fields.bulkAdd(data.fieldList);
      return from(db.forms.add(data.cmdForm));
    } catch (error) {
      throw error;
    }
  }

  update(id: string, form: Form): Observable<number> {
    const data = this.prepareData(id, form);

    const getFormById$ = this.getById({params: {id}});
    const deleteFieldItems$ = this.deleteFieldItemsBatch(id);
    const deleteFields$ = this.deleteFormFieldsBatch(id);
    const addFields$ = from(db.fields.bulkAdd(data.fieldList));
    const addFieldItems$ = from(db.fieldItems.bulkAdd(data.itemList));
    const editForm$ = from(db.forms.update(id, data.cmdForm));
    try {
      return combineLatest([getFormById$,deleteFieldItems$ ,deleteFields$, addFieldItems$, addFields$, editForm$],
        (getFormByIdResult,deleteFieldItems, deleteFieldsResult, addFieldItems, addFieldsResult, editFormResult) => {
        return editFormResult;
      })
    } catch (error) {
      throw error;
    }
  }

  delete(id: string): Observable<void> {
    const deleteFields$ = this.deleteFormFieldsBatch(id);
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

  deleteFieldItemsBatch(formId: string): AsyncSubject<boolean> {
    let deleteFieldItemsSubject$ = new AsyncSubject<boolean>();

    from(db.fieldItems.where('formId').equals(formId).delete())
      .subscribe(() => {
        deleteFieldItemsSubject$.next(true);
        deleteFieldItemsSubject$.complete();
      });
    return deleteFieldItemsSubject$;
  }

  prepareData(formId: string, form: Form) {
    const cmdForm: Form = {
      id: formId,
      name: form.name,
      displayName: form.displayName,
      accessLevel: form.accessLevel,
      columnCount: form.columnCount
    }

    const fieldList = [];
    const itemList = [];
    for (let field of form.fields || []) {
      const fieldId = field.id ? field.id : this.createGuid();
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
        repeatPassword: field.repeatPassword,
        index: field.index
      });
      for (let item of field.items || []) {
        itemList.push({
          id: item.id ? item.id : this.createGuid(),
          key: item.key,
          value: item.value,
          fieldId: fieldId,
          formId: formId,
        })
      }
    }
    return {
      cmdForm,
      fieldList,
      itemList
    }
  }

  createGuid() {
    return guid.create().toString();
  }
}

