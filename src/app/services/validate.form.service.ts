import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidateFormService {

  constructor() {
  }
  validateAllControls(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control !== null) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

}
