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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];

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
        if (error.status === 404) {
          this.errorMessages = [
            'Username not found, use scheme',
            'Max Mustermann => m.mustermann',
            'write everything in lower case',
          ];
        } else {
          this.errorMessages = ['An error occurred. Please try again.'];
        }
      }
    );
  }
}
