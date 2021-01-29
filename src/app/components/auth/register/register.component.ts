import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private _initialForm: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this._initialForm.group({
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
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  async onSignUp({ email, password }: any) {
    await this.authService.onSingUp(email, password);
    if (this.authService.iseLoggedIn) {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  ngOnInit(): void {}
}
