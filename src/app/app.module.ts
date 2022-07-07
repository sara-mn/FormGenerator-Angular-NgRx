import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./material.madule";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, //dialog
      useValue: {
        hasBackdrop: true,
        width: "70%",
        //height: "80%",
        maxHeight: "90%",
        maxWidth: "90%",
        position: {top: '5%'}
      }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, //form
      useValue: {appearance: 'fill'}
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
