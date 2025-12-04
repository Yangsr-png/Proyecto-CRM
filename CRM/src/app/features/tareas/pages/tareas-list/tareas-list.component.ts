import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasService } from '../../../../services/tareas.service';
import { Tarea } from '../../../../models/tarea.model';
import { TareaFormComponent } from '../../../../components/tarea-form/tarea-form.component'; // Importar

@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [CommonModule, TareaFormComponent], // Añadir al imports
  templateUrl: './tareas-list.component.html'
})
export class TareasListComponent implements OnInit {
  private tareasService = inject(TareasService);
  
  tareas = signal<Tarea[]>([]);
  loading = signal<boolean>(false);
  modalAbierto = signal<boolean>(false);

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.loading.set(true);
    this.tareasService.findAll().subscribe({
      next: (data) => {
        this.tareas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  // --- Métodos del Modal ---
  abrirModal() { this.modalAbierto.set(true); }
  cerrarModal() { this.modalAbierto.set(false); }

  guardarTarea(tareaBackend: any) {
    this.tareasService.create(tareaBackend).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarTareas(); 
        alert('Tarea creada correctamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error. Verifica que el Backend está corriendo y existe el Usuario ID 1.');
      }
    });
  }

  borrar(id: number) {
    if(confirm('¿Eliminar esta tarea permanentemente?')) {
      this.tareasService.delete(id).subscribe(() => this.cargarTareas());
    }
  }

  // --- Estilos ---
  getEstilosBadge(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'EN_PROCESO': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'COMPLETADA': return 'bg-green-50 text-green-700 border-green-200';
      case 'CANCELADA': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  }

  getColorBorde(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'bg-yellow-400';
      case 'EN_PROCESO': return 'bg-blue-500';
      case 'COMPLETADA': return 'bg-green-500';
      case 'CANCELADA': return 'bg-red-500';
      default: return 'bg-slate-300';
    }
  }
}