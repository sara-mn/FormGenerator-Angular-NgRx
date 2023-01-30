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

  confirm(title: string, description: string, fn: () => {}) {
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
          fn();
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }})
  }

  success(successMessage: string) {
    //ToDo
  }

  error(message : string) {

  }

  warning() {
    //ToDo
  }

  info() {
    //ToDo
  }


}
