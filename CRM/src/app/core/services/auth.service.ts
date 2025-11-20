import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, Observable } from 'rxjs';

interface AuthResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080/api/auth';

  private isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public isAuthenticated$ = this.isLoggedIn$.asObservable();

  public get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  // --- LOGIN REAL (Actualizado a Email) ---
  login(credentials: any): Observable<AuthResponse> {
    // Como tu formulario ya tiene los campos 'email' y 'password',
    // y el Backend ahora espera exactamente eso, podemos enviarlo directo.
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isLoggedIn$.next(true);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  // --- REGISTRO REAL (Actualizado a Email) ---
  register(userData: any): Observable<AuthResponse> {
    // Mapeamos los datos para que coincidan con el DTO de Java
    const requestBody = {
      nombre: userData.name,     // Frontend: 'name' -> Backend: 'nombre'
      email: userData.email,     // Frontend: 'email' -> Backend: 'email' (CORREGIDO)
      password: userData.password
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, requestBody).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isLoggedIn$.next(true);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }
}