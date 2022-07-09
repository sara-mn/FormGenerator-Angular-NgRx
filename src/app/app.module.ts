import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./material.madule";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { FormListComponent } from './components/form/form-list/form-list.component';
import { FormEntryComponent } from './components/form/form-entry/form-entry.component';
import { FormDetailComponent } from './components/form/form-detail/form-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserListComponent } from './components/auth/user-list/user-list.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import {DataTableComponent} from "./directives/data-table/data-table.component";

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormEntryComponent,
    FormDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    ProfileComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
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
