import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/clientes`;

  // MOCKS: Datos de prueba
  private mockClientes: Cliente[] = [
    { 
      id: 101, 
      nombre: 'Tech Solutions S.L.', 
      cif: 'B12345678', 
      direccion: 'Calle Innovación 7, Madrid', 
      email: 'contacto@techsol.com', 
      telefono: '912 333 444', 
      estado: 'ACTIVO' 
    },
    { 
      id: 102, 
      nombre: 'Restaurante El Puerto', 
      cif: 'B87654321', 
      direccion: 'Av. del Mar 22, Valencia', 
      email: 'admin@elpuerto.es', 
      telefono: '960 111 222', 
      estado: 'ACTIVO' 
    },
    { 
      id: 103, 
      nombre: 'Construcciones Norte', 
      cif: 'A11223344', 
      direccion: 'Polígono Ind. Sur, Bilbao', 
      email: 'obras@cnorte.com', 
      telefono: '944 555 666', 
      estado: 'INACTIVO' 
    }
  ];

  // 1. Listar (Mezcla Backend + Mocks)
  getClientes(filtros?: { nombre?: string; estado?: string }): Observable<Cliente[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.nombre) params = params.set('nombre', filtros.nombre);
      if (filtros.estado) params = params.set('estado', filtros.estado);
    }

    return this.http.get<Cliente[]>(this.apiUrl, { params }).pipe(
      map(clientesReales => [...this.mockClientes, ...clientesReales]),
      catchError((err) => {
        console.warn('Backend no disponible. Usando Mocks.', err);
        return of(this.mockClientes); // Si falla, devuelve solo mocks
      })
    );
  }

  // 2. Obtener por ID
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const encontrado = this.mockClientes.find(c => c.id === id);
        return encontrado ? of(encontrado) : throwError(() => new Error('Cliente no encontrado'));
      })
    );
  }

  // 3. Crear
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(
      catchError(() => {
        // Simulación de éxito si no hay backend
        const nuevoId = Math.max(...this.mockClientes.map(c => c.id || 0)) + 1;
        const nuevoClienteMock = { ...cliente, id: nuevoId };
        this.mockClientes.push(nuevoClienteMock);
        return of(nuevoClienteMock);
      })
    );
  }

  // 4. Actualizar (MODIFICADO PARA QUE FUNCIONE CON MOCKS)
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente).pipe(
      catchError((error) => {
        // Si el backend falla (404 o 500), miramos si es un mock
        const index = this.mockClientes.findIndex(c => c.id === id);
        
        if (index !== -1) {
          // ES UN MOCK: Lo actualizamos en local y fingimos que todo fue bien
          console.log('Actualizando mock localmente:', cliente);
          this.mockClientes[index] = { ...cliente, id };
          return of(this.mockClientes[index]);
        }
        
        // Si no es un mock y falló, lanzamos el error real
        return throwError(() => error);
      })
    );
  }

  // 5. Eliminar (MODIFICADO PARA QUE FUNCIONE CON MOCKS)
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        const index = this.mockClientes.findIndex(c => c.id === id);
        if (index !== -1) {
          // Es un mock, lo borramos del array local
          this.mockClientes.splice(index, 1);
          return of(void 0);
        }
        return throwError(() => error);
      })
    );
  }
}