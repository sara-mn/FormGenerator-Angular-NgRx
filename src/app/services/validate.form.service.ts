import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidateFormService {

  constructor() {
  }

  // validateAllControls(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if (control !== null) {
  //       if (control instanceof FormControl) {
  //         let k = control as FormControl<any>;
  //         if(k.hasError('required'))
  //           k.setErrors(Validators.required);
  //       } else if (control instanceof FormGroup) {
  //         this.validateAllControls(control);
  //       }
  //     }
  //   });
  // }
}
