import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private _initialForm: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this._initialForm.group({
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  async onSignUp({ email, password }: any) {
    this.authService
      .onSignIn(email, password)
      .then((res) => {
        this.onLoginRedirect();
      })
      .catch((err) => {
        console.log('err', err.message);
      });
  }

  onLoginRedirect() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
