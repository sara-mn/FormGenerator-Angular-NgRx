import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

/*  module  */
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from "./material.madule";
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgrxModule} from "./store/ngrx.module"
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

/*  config  */
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MAT_SELECT_CONFIG} from "@angular/material/select";

/*  service  */
import {CdProfilerService} from './services/cd-profiler.service';

/*  component  */
import {AppComponent} from './app.component';
import {AuthGuard} from "./services/guard/auth.guard";
import {RetryInterceptorService} from "./services/interceptor/retry.interceptor.service";
import {RouterModule} from "@angular/router";
import {PipesModule} from "./pipes/pipes.module";
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FormListComponent} from "./components/form/form-list/form-list.component";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./components/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    PipesModule,
    NgrxModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    SharedModule,
    AuthModule,
    // FormModule  => its not to be hear if we want use lazy load
  ],
  providers: [
    // AuthGuard,
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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private cd: CdProfilerService) {
  }
}
