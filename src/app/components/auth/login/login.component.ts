import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRegisterService} from "../../../services/login.register.service";
import {AlertService} from "../../../services/alert.service";
import {LoggerService} from "../../../services/logger.service";
import {from, Observable} from "rxjs";
import {Login, Token} from "../../../store/models/user";
import {ValidateFormService} from "../../../services/validate.form.service";
import {select, Store } from '@ngrx/store';
import {AppState} from "../../../store/app.state";
import {authErrorSelector, authLoadingSelector, tokenSelector} from "../../../store/selectors/auth.selectors";
import {AuthActions} from "../../../store/actions/auth.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrors: boolean = false;
  errors: string [] = [];
  loading$: Observable<boolean>;
  error$: Observable<Error | undefined>;
  token$: Observable<Token | undefined>;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginRegisterService,
              private validateFormService: ValidateFormService,
              private store: Store<AppState>,
              private alert: AlertService,
              private logger: LoggerService,
              private router: Router) {
    this.loading$= this.store.pipe(select(authLoadingSelector));
    this.error$= this.store.pipe(select(authErrorSelector));
    this.token$= this.store.pipe(select(tokenSelector));

    this.loginForm = this.formBuilder.group({
      username: ['', [
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

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  isFieldValid(name: string) {
    const field = this.loginForm.get(name) as FormControl;
    return (field.invalid && (field.touched || field.dirty))
  }

  login() {
    if (this.loginForm.invalid)
      return this.validateFormService.validateAllControls(this.loginForm);

    const cmd: Login = {
      username: this.username.value,
      password: this.password.value
    }

    this.store.dispatch(AuthActions.login(cmd));

    // this.loginService.login(cmd).subscribe({
    //   next: () => {
    //     from(this.router.navigateByUrl('/')).subscribe();
    //     this.loading$= this.store.pipe(select(authLoadingSelector));
    //   },
    //   error: (err) => this.alert.error(err)
    // });
  }
}
