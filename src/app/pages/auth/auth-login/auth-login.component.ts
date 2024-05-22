import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor() {}

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/layout'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
