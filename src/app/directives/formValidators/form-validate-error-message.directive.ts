import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors} from "@angular/forms";
import formErrors from './form.errors.json';
import {Error, Error_Directive_Input} from './validation.type'

@Directive({
  selector: '[errorMessages]',
  providers: [{provide: NG_VALIDATORS, useExisting: FormValidateErrorMessageDirective, multi: true}],
})
export class FormValidateErrorMessageDirective {
  @Input('errorMessages') set errorMessages(control: { errors: any, isValid: Boolean }) {
    this.errors = [];
    if (control.isValid)
      this.setErrorMessage(control.errors);

    if (!this.isViewCreated) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, this.errorMessagesContext);
      this.isViewCreated = true;
    }
  }

  private readonly errorMessagesContext = new ErrorMessagesContext();
  isViewCreated: boolean = false;
  errorObject: ValidationErrors = {};
  errors: Error[];

  constructor(private templateRef: TemplateRef<ErrorMessagesContext>,
              private viewContainerRef: ViewContainerRef) {
  }

  setErrorMessage(errors: Error[]) {
      if (errors !== null) {
        this.errorObject = errors;
        this.errors = Object.keys(this.errorObject).map(error => {
          let returnedObject = this.errorObject[error];
          return {
            errorTitle: error,
            returnedObject,
            errorMessage: formErrors[error] ? formErrors[error] : 'error message is undefined , error title: ' + error  //.format(Object.values(returnedObject).join(','))
          }
        })
      }

    this.errorMessagesContext.errors = this.errors;
  }

  static ngTemplateContextGuard(directive: FormValidateErrorMessageDirective, context: unknown)
    : context is ErrorMessagesContext {
    return true;
  }
}

class ErrorMessagesContext {
  errors: Error[] = []
}

