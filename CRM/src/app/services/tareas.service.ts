import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model'; // usa la MISMA ruta que se usa para Cliente

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  // Ajusta la URL a la que expone el backend las tareas
  private readonly apiUrl = 'http://localhost:8080/api/tareas';

  constructor(private http: HttpClient) {}

  // (opcional) obtener lista de tareas con filtros
  getTareas(filtros?: { estado?: string; titulo?: string }): Observable<Tarea[]> {
    let params = new HttpParams();

    if (filtros?.estado) {
      params = params.set('estado', filtros.estado);
    }

    if (filtros?.titulo) {
      params = params.set('titulo', filtros.titulo);
    }

    return this.http.get<Tarea[]>(this.apiUrl, { params });
  }

  // obtener UNA tarea por id (lo usa el formulario en modo edición)
  getTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  // crear nueva tarea (POST, lo usa el formulario en modo "nueva tarea")
  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  // actualizar tarea existente (PUT, lo usa el formulario en modo edición)
  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
  }

  // (opcional) eliminar tarea
  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
