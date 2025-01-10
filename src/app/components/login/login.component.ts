import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AuthenticationRequest } from '../../models/AuthenticationRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  authenticate() {
    const authenticationRequest: AuthenticationRequest = {
      username: this.loginForm.value.username,
    };

    this.authService.authenticate(authenticationRequest).subscribe(
      (response) => {
        this.router.navigate([`/`]);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
