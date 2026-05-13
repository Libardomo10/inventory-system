import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignInModel } from '../../models/sign-in.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const signInData: SignInModel = this.loginForm.value as SignInModel;

    try {
      this.authService.signIn(signInData).subscribe({
        next: (response) => {
          if (!response.isSuccess) {
            this.toastr.error(response.message);
            return;
          }

          localStorage.setItem('token', response.data.accessToken);
          this.router.navigate(['/inventory']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastr.error(
            err.error?.message || 'Inicio de sesión fallido, por favor intente nuevamente.',
          );
        },
      });
    } catch (error) {
      console.error('Error durante el inicio de sesión.', error);
      this.toastr.error('Ocurrió un error durante el inicio de sesión, por favor intente nuevamente.');
      return;
    }
  }
}
