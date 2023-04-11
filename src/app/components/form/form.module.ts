import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormEntryComponent} from "./form-entry/form-entry.component";
import {FormDetailComponent} from "./form-detail/form-detail.component";
import {FormPreviewComponent} from "./form-preview/form-preview.component";
import {FieldEntryComponent} from "./field-entry/field-entry.component";
import {FieldPlacementComponent} from "./field-placement/field-placement.component";
import {FormRoutingModule} from "./form-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material.madule";
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    FormEntryComponent,
    FormDetailComponent,
    FormPreviewComponent,
    FieldEntryComponent,
    FieldPlacementComponent
  ],
  exports: [
    FormEntryComponent,
    FormDetailComponent,
    FormPreviewComponent,
    FieldEntryComponent,
    FieldPlacementComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DirectivesModule
  ]
})
export class FormModule {
}
