import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  // Usa la URL del environment
  private apiUrl = `${environment.apiUrl}/auth`;

  // --- SIGNAL DE ESTADO (Privado) ---
  // Inicializa leyendo del localStorage
  private _token = signal<string | null>(localStorage.getItem('token'));

  // --- SIGNAL COMPUTADO (Público) ---
  // Se actualiza automáticamente cuando _token cambia
  public isLoggedIn = computed(() => !!this._token());

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this._token.set(response.token); // Actualizamos el signal
        this.router.navigate(['/dashboard']);
      })
    );
  }

  register(userData: any): Observable<AuthResponse> {
    // Mapeo de datos para el backend
    const requestBody = {
      nombre: userData.name,
      email: userData.email,
      password: userData.password
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, requestBody).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this._token.set(response.token);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._token.set(null); // Limpiamos el signal
    this.router.navigate(['/auth/login']);
  }
}