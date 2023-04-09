import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {NG_VALIDATORS, ValidationErrors} from "@angular/forms";
import * as fEs from './form.errors.json';
import {Error} from './validation.type'
import {KeyValue} from "../../dbManaging/types";

@Directive({
  selector: '[errorMessages]',
  providers: [{provide: NG_VALIDATORS, useExisting: FormValidateErrorMessageDirective, multi: true}],
})
export class FormValidateErrorMessageDirective {
  formErrors: KeyValue = fEs;
  @Input('errorMessages') set errorMessages(control: { errors: any, isInValid: Boolean }) {
    this.errors = [];
    if (control.isInValid)
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
            errorMessage: this.formErrors[error] ? this.formErrors[error] : 'error message is undefined , error title: ' + error  //.format(Object.values(returnedObject).join(','))
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

