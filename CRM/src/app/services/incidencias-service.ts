import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Incidencia } from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciasService {

  // Datos de prueba para visualizar el diseño
  private mockData: Incidencia[] = [
    {
      id: 1,
      asunto: 'Fallo Aire Acondicionado',
      ubicacion: 'Oficinas Centrales',
      prioridad: 'ALTA',
      estado: 'EN_CURSO',
      fecha: '2023-10-25',
      tecnicoAsignado: { nombre: 'Juan Pérez' }
    },
    {
      id: 2,
      asunto: 'Puerta Rota',
      ubicacion: 'Almacén B',
      prioridad: 'MEDIA',
      estado: 'PENDIENTE',
      fecha: '2023-10-26',
      tecnicoAsignado: { nombre: 'María García' }
    },
    {
      id: 3,
      asunto: 'Fuga de Agua',
      ubicacion: 'Planta 2',
      prioridad: 'BAJA',
      estado: 'RESUELTO',
      fecha: '2023-10-20',
      tecnicoAsignado: { nombre: 'Roberto López' }
    },
     {
      id: 4,
      asunto: 'Luces parpadeando',
      ubicacion: 'Recepción',
      prioridad: 'ALTA',
      estado: 'PENDIENTE',
      fecha: '2023-10-27' // Sin técnico
    }
  ];

  findAll(): Observable<Incidencia[]> {
    return of(this.mockData);
  }

  // Aquí agregarías delete, create, etc.
}