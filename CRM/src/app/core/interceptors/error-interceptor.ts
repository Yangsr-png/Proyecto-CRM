import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if (error.status === 401) {
        // Token expirado o no válido
        localStorage.removeItem('token');
        router.navigate(['/auth/login']);
        errorMessage = 'Tu sesión ha expirado.';
      } else if (error.status === 403) {
        errorMessage = 'No tienes permiso para realizar esta acción.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.status >= 500) {
        errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
      }

      // Aquí podrías llamar a un servicio de Toast/Notificaciones (ej. HotToast o MatSnackBar)
      console.error('Error Interceptor:', errorMessage, error);
      
      // Relanzamos el error para que el componente también se entere si es necesario
      return throwError(() => new Error(errorMessage));
    })
  );
};