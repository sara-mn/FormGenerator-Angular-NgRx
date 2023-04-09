import {Injectable} from '@angular/core';
import Swal from 'sweetalert2' ;
import swalWithBootstrapButtons from 'sweetalert2' ;

import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  confirm(title: string, description: string, _callback?: Function) {
    Swal.fire({
      title: title,
      text: description,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
          if (_callback) {
            _callback();
          }
          // swalWithBootstrapButtons.fire(
          //   'success'
          // )
        }
        // else if (
        //   /* Read more about handling dismissals below */
        //   result.dismiss === Swal.DismissReason.cancel
        // ) {
        //   swalWithBootstrapButtons.fire(
        //     'Cancelled'
        //   )
        // }
    })
  }

  success(successMessage: string,callback?: (...args: any[]) => {}) {
    Swal.fire({
      title: 'success',
      text: successMessage,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'ok',
      reverseButtons: true
    }).then((result) => {
      if (callback)
        callback([result]);
    })
  }

  error(message : string) {
    Swal.fire({
      title: 'error',
      text: message,
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'ok',
      reverseButtons: true
    }).then((result) => {})
  }

  warning() {
    //ToDo
  }

  info() {
    //ToDo
  }


}
