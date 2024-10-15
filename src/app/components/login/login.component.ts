import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AuthenticationRequest } from '../../models/AuthenticationRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  authenticate() {
    const authenticationRequest: AuthenticationRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.authenticate(authenticationRequest).subscribe(
      response => {
        console.log(response);
        this.router.navigate([`/`]);
      },
      error => {
        console.log(error.error);
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
