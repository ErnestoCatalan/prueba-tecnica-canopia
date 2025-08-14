import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(cloned).pipe(
      catchError(error => {
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/login']);
          // Mostrar mensaje al usuario
          authService.messageService.add({
            severity: 'error',
            summary: 'Sesión expirada',
            detail: 'Por favor inicia sesión nuevamente'
          });
        }
        return throwError(error);
      })
    );
  }

  return next(req);
};
