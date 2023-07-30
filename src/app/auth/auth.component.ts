import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  @ViewChild('authForm') slForm: NgForm;
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private route: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submitForm(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    console.log(email, password);

    let authObs: Observable<authResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      this.isLoading = true;
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);

        this.route.navigate(['./recipes']);

        this.isLoading = false;
      },
      (errorMessage) => {
        this.error = errorMessage;

        this.isLoading = false;
      }
    );

    authForm.reset();
  }
}
