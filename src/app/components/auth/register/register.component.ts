import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRegisterService} from "../../../services/login.register.service";
import {AlertService} from "../../../services/alert.service";
import {LoggerService} from "../../../services/logger.service";
import {Router} from "@angular/router";
import {from} from "rxjs";
import {User} from "../../../../types";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showErrors: boolean = false;
  errors: string [] = [];

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginRegisterService,
              private alert: AlertService,
              private logger: LoggerService,
              private router: Router) {

    this.registerForm = this.formBuilder.group({
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
    return this.registerForm.get('username') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  isFieldValid(name: string) {
    const field = this.registerForm.get(name) as FormControl;
    return (field.valid && (field.touched || field.dirty))
  }

  register() {
    const cmd: User = {
      email: this.username.value,
      password: this.password.value
    }

    this.loginService.register(cmd).subscribe({
      next: () => {
        this.alert.success('user registered')
        from(this.router.navigateByUrl('/login')).subscribe();
      },
      error: (err) => this.alert.error(err)
    });
  }
}
