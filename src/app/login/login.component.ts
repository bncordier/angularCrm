import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorLogin = {
    required: 'Valeur obligatoires',
    minlength: '3 caractères obligatoires',
  };

  errorPassword = {
    required: 'Valeur obligatoires',
    no$InPassword: 'pas de `$` dans le mot de passe',
  };

  loginForm: FormGroup;
  private subs: Subscription[]=[];

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.disconnect();
    this.loginForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [Validators.required, no$InPassword]),
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  login(): void {
    this.subs
      .push(this.auth.authUser (this.loginForm.value.login, this.loginForm.value.password)
      .subscribe({
        next: (user: User) => {
          this.router.navigateByUrl('/home');
        },
        error: (error: Error) => {alert(error.message)},
        complete: () => {},
      }));
  }
}

function no$InPassword(c: AbstractControl): ValidationErrors | null {
  if ((c.value as string).indexOf('$') < 0) {
    return null;
  }
  return { no$InPassword: '$ is not supported' };
}
