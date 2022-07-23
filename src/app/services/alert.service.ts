import {Injectable} from '@angular/core';
import swal from "sweetalert";
import {ButtonList} from "sweetalert/typings/modules/options/buttons";
import {ContentOptions} from "sweetalert/typings/modules/options/content";
import {SwalOptions} from "sweetalert/typings/modules/options";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // swalConfig: SwalOptions;

  constructor() {
  }

  confirm(title: string, description: string): Observable<any> {
    return from(swal({
      title: title,
      text: description,
      icon: "",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: false,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "",
          closeModal: true
        }
      },
      // content: {
      //   element: "input",
      //   attributes: {
      //     placeholder: "Type your password",
      //     type: "password",
      //   },
      // },
      // className: "red-bg",
      // closeOnClickOutside: false,
      // closeOnEsc: false,
      // dangerMode: true,
      // timer: 3000,
    }))
  }

  success(successMessage: string) {
    //ToDo
  }

  error() {
    //ToDo
  }

  warning() {
    //ToDo
  }

  info() {
    //ToDo
  }


}
