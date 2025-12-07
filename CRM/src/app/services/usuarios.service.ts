import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  // MOCKS CON NOMBRE (Coinciden con Backend)
  private mockUsers: Usuario[] = [
    { 
      id: 101, 
      nombre: 'Juan Pérez', 
      email: 'juan.perez@mantenimientos.com', 
      role: 'TECNICO', 
      activo: true 
    },
    { 
      id: 102, 
      nombre: 'María García', 
      email: 'maria.admin@mantenimientos.com', 
      role: 'ADMIN', 
      activo: true 
    },
    { 
      id: 103, 
      nombre: 'Roberto López', 
      email: 'roberto.l@mantenimientos.com', 
      role: 'TECNICO', 
      activo: false 
    }
  ];

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(usersReales => [...this.mockUsers, ...usersReales]),
      catchError((err) => {
        console.warn('Backend no disponible. Usando Mocks.', err);
        return of(this.mockUsers);
      })
    );
  }

  create(usuario: any): Observable<any> {
    // Enviamos { nombre, email, password, role } 
    return this.http.post(this.apiUrl, usuario);
  }
}