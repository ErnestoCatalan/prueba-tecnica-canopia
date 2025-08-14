// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    CommonModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      background: #f8f9fa;
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      margin-bottom: 1.5rem;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .register-redirect-card {
      width: 100%;
      max-width: 400px;
      text-align: center;
      padding: 1rem;
    }
    .p-button-link {
      padding: 0;
      color: var(--primary-color);

      &:enabled:hover {
        background: transparent;
        color: var(--primary-color);
        text-decoration: underline;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  emailInvalid = false;
  passwordInvalid = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit() {
    this.emailInvalid = !this.email;
    this.passwordInvalid = !this.password;

    if (this.emailInvalid || this.passwordInvalid) {
      return;
    }

    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales incorrectas'
        });
        this.loading = false;
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
