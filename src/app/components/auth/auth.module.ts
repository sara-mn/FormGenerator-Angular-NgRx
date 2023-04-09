import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ProfileComponent} from "./profile/profile.component";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material.madule";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    ProfileComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule
  ]
})
export class AuthModule { }
