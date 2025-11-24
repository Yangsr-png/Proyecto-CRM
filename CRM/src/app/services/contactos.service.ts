import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto.model'; 

@Injectable({ providedIn: 'root' })
export class ContactosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/contactos';

  // Obtener contactos de un cliente específico
  getByCliente(clienteId: number): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  // Crear nuevo contacto (Requiere ID del cliente según tu Controller Java)
  create(clienteId: number, contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(`${this.apiUrl}/cliente/${clienteId}`, contacto);
  }

  // Actualizar contacto
  update(id: number, contacto: Contacto): Observable<Contacto> {
    return this.http.put<Contacto>(`${this.apiUrl}/${id}`, contacto);
  }

  // Eliminar contacto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}