import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Incidencia } from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciasService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/incidencias`;

  // MOCKS
  private mockData: Incidencia[] = [
    { 
      id: 101, 
      asunto: 'Fallo Aire Acondicionado', 
      ubicacion: 'Calle Innovación 7, Madrid', 
      prioridad: 'ALTA', 
      estado: 'EN_CURSO', 
      fecha: '2023-10-25', 
      clienteId: 101,
      tecnicoAsignado: { id: 1, nombre: 'Juan Pérez', email: 'juan@test.com' } 
    },
    { 
      id: 102, 
      asunto: 'Puerta Rota', 
      ubicacion: 'Av. del Mar 22, Valencia', 
      prioridad: 'MEDIA', 
      estado: 'PENDIENTE', 
      fecha: '2023-10-26',
      clienteId: 102, 
      tecnicoAsignado: { id: 2, nombre: 'María García', email: 'maria@test.com' } 
    }
  ];

  findAll(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl).pipe(
      map(datosReales => [...this.mockData, ...datosReales]),
      catchError(() => of(this.mockData))
    );
  }

  create(incidencia: Incidencia): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.apiUrl, incidencia).pipe(
      catchError(() => {
        const nuevoId = Math.max(...this.mockData.map(i => i.id || 0)) + 1;
        const nuevaMock = { ...incidencia, id: nuevoId };
        this.mockData.push(nuevaMock);
        return of(nuevaMock);
      })
    );
  }

  update(id: number, incidencia: Incidencia): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.apiUrl}/${id}`, incidencia).pipe(
      catchError((error) => {
        const index = this.mockData.findIndex(i => i.id === id);
        if (index !== -1) {
          this.mockData[index] = { ...incidencia, id };
          return of(this.mockData[index]);
        }
        return throwError(() => error);
      })
    );
  }

  // ---MÉTODO ELIMINAR ---
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        // Si falla (o es mock), intentamos borrar del array local
        const index = this.mockData.findIndex(i => i.id === id);
        if (index !== -1) {
          this.mockData.splice(index, 1); // Borrar del array
          return of(void 0);
        }
        return throwError(() => error);
      })
    );
  }
}