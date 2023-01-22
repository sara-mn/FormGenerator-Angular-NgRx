import {NgModule} from '@angular/core';

/*  module  */
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from "./material.madule";
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgrxModule} from "./states/ngrx.module";
import {HttpClientModule , HTTP_INTERCEPTORS} from "@angular/common/http";

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
import {FormValidateErrorMessageDirective} from "./directives/formValidators/form-validate-error-message.directive";
import {AuthGuard} from "./services/guard/auth.guard";
import {RetryInterceptorService} from "./services/interceptor/retry.interceptor.service";
import {RouterModule} from "@angular/router";
import { FormPreviewComponent } from './components/form/form-preview/form-preview.component';
import {PipesModule} from "./pipes/pipes.module";

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
    FormPreviewComponent,
  ],
  // entryComponents:[
  //   LoginComponent
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgrxModule,
    RouterModule,
    PipesModule
  ],
  providers: [
     AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RetryInterceptorService,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RetryInterceptorService,
    //   multi: true
    // },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private cd: CdProfilerService) {
  }
}
