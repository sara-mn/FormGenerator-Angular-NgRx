import { Injectable } from '@angular/core';
import {StorageType} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage(item:string) {
    return localStorage.getItem(item)
  }

  setStorage(items: StorageType[]) {
    items.forEach(item => {
      localStorage.setItem(item.key,item.value);
    })
  }

  clearStorage() {
    localStorage.clear();
  }
}
