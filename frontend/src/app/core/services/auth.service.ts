// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginResponse, RegisterData, User } from '../../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    public messageService: MessageService
  ) {}

  register(userData: RegisterData): Observable<User> {
    const dataToSend = {
      ...userData,
      role: userData.role || 'user'
    };

    return this.http.post<User>(`${this.apiUrl}/register`, dataToSend).pipe(
      catchError(error => {
        this.handleError(error, 'Error en el registro');
        return throwError(error);
      })
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.setSession(response);
        this.router.navigate(['/products']);
      }),
      catchError(error => {
        this.handleError(error, 'Error en el login');
        return throwError(error);
      })
    );
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private handleError(error: any, defaultMessage: string): void {
    let errorMessage = defaultMessage;

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'No se pudo conectar al servidor';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor';
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage
    });
  }
}
