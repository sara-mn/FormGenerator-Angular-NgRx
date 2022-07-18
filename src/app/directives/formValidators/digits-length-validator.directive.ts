import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[digitsLengthValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DigitsLengthValidatorDirective, multi: true}]
})
export class DigitsLengthValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors|null {
    // return {'custom': true};
    const numDigits = control.value.replace(/[^\d]+/g, '').length;
    // Only worried about US-based numbers for now, no need for country code
    if (numDigits === 10) { return null; }
    // Uh oh, something's wrong
    if (numDigits > 10) {
      return {
        tooLong: { numDigits }
      };
    } else {
      return {
        tooShort: { numDigits }
      };
    }
  }
}
