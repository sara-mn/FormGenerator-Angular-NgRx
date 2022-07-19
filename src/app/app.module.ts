import {NgModule} from '@angular/core';

/*  module  */
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from "./material.madule";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgrxModule} from "./states/ngrx.module";

/*  config  */
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MAT_SELECT_CONFIG} from "@angular/material/select";

/*  service  */
import {CdProfilerService} from './services/cd-profiler.service';

/*  component  */
import {AppComponent} from './app.component';
import {FormListComponent} from './components/form/form-list/form-list.component';
import {FormEntryComponent} from './components/form/form-entry/form-entry.component';
import {FormDetailComponent} from './components/form/form-detail/form-detail.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {UserListComponent} from './components/auth/user-list/user-list.component';
import {ProfileComponent} from './components/auth/profile/profile.component';
import {GridComponent} from "./directives/grid/grid.component";
import {DataTableComponent} from './directives/data-table/data-table.component';
import {FieldEntryComponent} from './components/field/field-entry/field-entry.component';
import {MAT_PAGINATOR_DEFAULT_OPTIONS} from "@angular/material/paginator";
import {FormValidateErrorMessageDirective} from "./directives/formValidators/form-validate-error-message.directive";
import { InfoBoxDirective } from './directives/infoBox/info-box.directive'

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
    GridComponent,
    DataTableComponent,
    FieldEntryComponent,
    FormValidateErrorMessageDirective,
    InfoBoxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgrxModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, //dialog
      useValue: {
        hasBackdrop: false,
        width: "70%",
        //height: "80%",
        maxHeight: "90%",
        maxWidth: "90%",
        position: {top: '5%'}
      }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, //form
      useValue: {
       // appearance: 'fill'
      }
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        disableOptionCentering: false,        //Whether option centering should be disabled.
        // overlayPanelClass:  ,              //Class or list of classes to be applied to the menu's overlay panel => string | string[] | Set<string> | { [key: string]: any; }
        // typeaheadDebounceInterval: 1000    //Time to wait in milliseconds after the last keystroke before moving focus to an item.
      }
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private cd: CdProfilerService) {
  }
}
