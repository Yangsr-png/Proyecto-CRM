import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/clientes';

  // 1. Listar con filtros
  getClientes(filtros?: { nombre?: string; cif?: string }): Observable<Cliente[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.nombre) params = params.set('nombre', filtros.nombre);
      if (filtros.cif) params = params.set('cif', filtros.cif);
    }
    return this.http.get<Cliente[]>(this.baseUrl, { params });
  }

  // 2. Obtener un solo cliente (para edición)
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // 3. Crear cliente (POST)
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  // 4. Actualizar cliente (PUT)
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  // 5. Eliminar (DELETE)
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}