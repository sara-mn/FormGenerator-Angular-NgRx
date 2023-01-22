import {Injectable} from "@angular/core";
import {EnumService as Enum} from './enum.service'

@Injectable({
  providedIn: 'root'
})
export class Enums {
  constructor() {
  }

  fieldType() {
    return new Enum (
      [
      {key: "Date", display: "Date"},
      {key: "Text", display: "Text"},
      {key: "TextArea", display: "TextArea"},
      {key: "Password", display: "Password"},
      {key: "Email", display: "Email"},
      {key: "Tel", display: "Tel"},
      {key: "Number", display: "Number"},
      {key: "DateRange", display: "DateRange"},
      {key: "List", display: "List"},
      {key: "Radio", display: "Radio"},
      {key: "CheckBox", display: "CheckBox"}
    ])}

}
