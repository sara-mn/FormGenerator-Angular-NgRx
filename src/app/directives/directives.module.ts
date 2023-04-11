import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormValidateErrorMessageDirective} from "./formValidators/form-validate-error-message.directive";

@NgModule({
  declarations: [
    FormValidateErrorMessageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormValidateErrorMessageDirective
  ]
})
export class DirectivesModule { }
