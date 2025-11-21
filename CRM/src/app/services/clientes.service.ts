import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl = 'http://localhost:8080/api/clientes'; // cambia el puerto si hace falta

  constructor(private http: HttpClient) {}

  // filtros básicos: nombre y cif
  getClientes(filtros?: { nombre?: string; cif?: string }): Observable<Cliente[]> {
    let params = new HttpParams();

    if (filtros) {
      if (filtros.nombre) {
        params = params.set('nombre', filtros.nombre);
      }
      if (filtros.cif) {
        params = params.set('cif', filtros.cif);
      }
    }

    return this.http.get<Cliente[]>(this.baseUrl, { params });
  }
}
