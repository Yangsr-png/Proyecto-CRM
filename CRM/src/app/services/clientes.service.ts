import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
  // Asegúrate de que environment.apiUrl esté definido o usa la URL directa: 'http://localhost:8080/api'
  private baseUrl = `${environment.apiUrl}/clientes`;

  // 1. Listar
  getClientes(filtros?: { nombre?: string; estado?: string }): Observable<Cliente[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.nombre) params = params.set('nombre', filtros.nombre);
      if (filtros.estado) params = params.set('estado', filtros.estado);
    }
    return this.http.get<Cliente[]>(this.baseUrl, { params });
  }

  // 2. Obtener por ID
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // 3. Crear (POST)
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  // 4. Actualizar (PUT)
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  // 5. Eliminar (DELETE) - ¡IMPORTANTE QUE ESTÉ ESTE MÉTODO!
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}