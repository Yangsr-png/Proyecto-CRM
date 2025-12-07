import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidenciasService } from '../../../../services/incidencias-service';
import { Incidencia } from '../../../../models/incidencia.model';

@Component({
  selector: 'app-incidencias-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencias-list.component.html'
})
export class IncidenciasListComponent {
  private service = inject(IncidenciasService);
  
  incidencias = signal<Incidencia[]>([]);

  ngOnInit() {
    this.service.findAll().subscribe(data => this.incidencias.set(data));
  }

  // --- Helpers de Diseño ---

  getPrioridadClass(prioridad: string): string {
    switch(prioridad) {
      case 'ALTA': return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIA': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'BAJA': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getEstadoClass(estado: string): string {
    switch(estado) {
      case 'EN_CURSO': return 'bg-blue-600 text-white shadow-blue-200';
      case 'PENDIENTE': return 'bg-slate-200 text-slate-600';
      case 'RESUELTO': return 'bg-green-500 text-white shadow-green-200';
      default: return 'bg-gray-200';
    }
  }
}