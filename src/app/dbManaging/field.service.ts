import { Injectable } from '@angular/core';
import { DBRequest, KeyValue } from './types';
import {IndexableType} from "dexie";
import { db } from 'src/db';
import {Field} from "../components/form/form-types";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor() { }
  async getAll() {
    const fields = await db.table("fields").toArray();
    return fields || [];
  }

  async getByName(req: DBRequest): Promise<Field | null> {
    const field = await db.fields.where('name').equals(req.params['name']).toArray();
    console.log(await this.getAll());

    if (field.length > 0)
      return field[0];
    else
      return null;
  }

  async getById(req: DBRequest) {
    const field = await db.fields.get((e: KeyValue) => e['id'] === req.params['id']);
    console.log(await this.getAll());

    if (field)
      return field;
    else
      throw 'field not found'
  }

  async create(field: Field): Promise<IndexableType> {
    let foundField = await this.getByName({params: field});

    if (foundField)
      throw "this Field is exist!"

    const cmd: Field = {
      name: field.name,
      display: field.display,
      type: field.type,
      description: field.description,
      inputFormat: field.inputFormat,
      displayFormat: field.displayFormat
    }

    try {
      return await db.fields.add(cmd);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, field: Field): Promise<void> {
    const cmd: Field = {
      name: field.name,
      display: field.display,
      type: field.type,
      description: field.description,
      inputFormat: field.inputFormat,
      displayFormat: field.displayFormat
    }
    try {
      await db.fields.update(id, cmd); // 0 or 1 return
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.fields.delete(id); // 0 or 1 return
    } catch (error) {
      throw error;
    }
  }
}
