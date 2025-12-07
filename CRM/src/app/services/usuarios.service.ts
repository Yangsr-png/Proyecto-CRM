import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  private mockUsers: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@mantenimientos.com',
      telefono: '+34 600 123 456',
      rol: 'TECNICO',
      activo: true,
      tareasAsignadas: 5
      // avatar: '...' (Si no ponemos avatar, usaremos las iniciales)
    },
    {
      id: 2,
      nombre: 'María García',
      email: 'maria.g@mantenimientos.com',
      telefono: '+34 600 999 888',
      rol: 'ADMIN',
      activo: true,
      tareasAsignadas: 0
    },
    {
      id: 3,
      nombre: 'Roberto López',
      email: 'roberto.l@mantenimientos.com',
      telefono: '+34 600 555 444',
      rol: 'TECNICO',
      activo: false, // Inactivo/Ocupado
      tareasAsignadas: 12
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.m@mantenimientos.com',
      telefono: '+34 600 111 222',
      rol: 'TECNICO',
      activo: true,
      tareasAsignadas: 2
    }
  ];

  findAll(): Observable<Usuario[]> {
    return of(this.mockUsers);
  }
}