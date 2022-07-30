import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRegisterService} from "../../../services/login.register.service";
import {AlertService} from "../../../services/alert.service";
import {Login} from "../auth-types";
import {LoggerService} from "../../../services/logger.service";
import {from} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrors: boolean = false;
  errors: string [] = [];

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginRegisterService,
              private alert: AlertService,
              private logger: LoggerService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      username: ['', [
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

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  isFieldValid(name: string) {
    const field = this.loginForm.get(name) as FormControl;
    return (field.valid && (field.touched || field.dirty))
  }

  login() {
    const cmd: Login = {
      username: this.username.value,
      password: this.password.value
    }

    this.loginService.login(cmd).subscribe({
      next: () => {
        from(this.router.navigateByUrl('/dashboard')).subscribe();
      },
      error: (err) => this.alert.error(err)
    });
  }
}
