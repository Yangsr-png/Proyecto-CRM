import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarea } from '../models/tarea.model';

@Injectable({ providedIn: 'root' })
export class TareasService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tareas`;

  findAll(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  create(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}