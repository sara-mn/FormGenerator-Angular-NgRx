import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRegisterService} from "../../../services/login.register.service";
import {AlertService} from "../../../services/alert.service";
import {LoggerService} from "../../../services/logger.service";
import {Router} from "@angular/router";
import {from, Observable} from "rxjs";
import {Token, User} from "../../../store/models/user";
import {ValidateFormService} from "../../../services/validate.form.service";
import {AppState} from "../../../store/app.state";
import {select, Store } from '@ngrx/store';
import {AuthActions} from "../../../store/actions/auth.action";
import {
  authErrorSelector,
  authLoadingSelector,
  tokenSelector,
  userIdSelector
} from "../../../store/selectors/auth.selectors";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showErrors: boolean = false;
  errors: string [] = [];
  loading$: Observable<boolean>;
  error$: Observable<Error | undefined>;
  userId$: Observable<number | undefined>;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginRegisterService,
              private validateFormService: ValidateFormService,
              private store: Store<AppState>) {

    this.loading$= this.store.pipe(select(authLoadingSelector));
    this.error$= this.store.pipe(select(authErrorSelector));
    this.userId$= this.store.pipe(select(userIdSelector));

    this.registerForm = this.formBuilder.group({
      name: ['', [
        Validators.minLength(3),
        Validators.required
      ]],
      username: ['', [
        Validators.minLength(3),
        Validators.required
      ]],
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })
  }

  ngOnInit(): void {
  }

  get name() {
    return this.registerForm.get('name') as FormControl;
  }

  get username() {
    return this.registerForm.get('username') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  isFieldValid(name: string) {
    const field = this.registerForm.get(name) as FormControl;
    return (field.invalid && (field.touched || field.dirty))
  }

  register() {
    if (this.registerForm.invalid)
      return this.validateFormService.validateAllControls(this.registerForm);

    const cmd: User = {
      name: this.name.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    }

    this.store.dispatch(AuthActions.register(cmd));

    // this.loginService.register(cmd).subscribe({
    //   next: () => {
    //     this.alert.success('user registered' , () => { return this.router.navigateByUrl('/login') })
    //   },
    //   error: (err) => this.alert.error(err)
    // });
  }
}
