import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncidenciasService } from '../../../../services/incidencias-service';
import { UsuariosService } from '../../../../services/usuarios.service';
import { ClientesService } from '../../../../services/clientes.service';

import { Incidencia } from '../../../../models/incidencia.model';
import { Usuario } from '../../../../models/usuario.model';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-incidencias-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencias-list.component.html'
})
export class IncidenciasListComponent implements OnInit {
  private service = inject(IncidenciasService);
  private usuariosService = inject(UsuariosService);
  private clientesService = inject(ClientesService);

  incidencias = signal<Incidencia[]>([]);
  tecnicos = signal<Usuario[]>([]);
  clientes = signal<Cliente[]>([]);
  
  modalAbierto = signal<boolean>(false);
  esEdicion = signal<boolean>(false);

  nuevaIncidencia: any = { 
    asunto: '', ubicacion: '', prioridad: 'MEDIA', estado: 'PENDIENTE', tecnicoAsignado: null, clienteId: null 
  };

  ngOnInit() {
    this.cargarIncidencias();
    this.cargarTecnicos();
    this.cargarClientes();
  }

  cargarIncidencias() { this.service.findAll().subscribe(data => this.incidencias.set(data)); }
  cargarTecnicos() { this.usuariosService.findAll().subscribe(data => this.tecnicos.set(data.filter(u => u.id && u.id < 100))); }
  cargarClientes() { this.clientesService.getClientes().subscribe(data => this.clientes.set(data)); }

  onClienteChange() {
    const idSeleccionado = Number(this.nuevaIncidencia.clienteId);
    const clienteEncontrado = this.clientes().find(c => c.id === idSeleccionado);
    if (clienteEncontrado) this.nuevaIncidencia.ubicacion = clienteEncontrado.direccion;
  }

  guardar() {
    if (!this.nuevaIncidencia.asunto) { alert('El asunto es obligatorio'); return; }
    const incidenciaParaGuardar = { ...this.nuevaIncidencia };

    if (this.esEdicion()) {
      this.service.update(incidenciaParaGuardar.id, incidenciaParaGuardar).subscribe({
        next: () => { this.cerrarModal(); this.cargarIncidencias(); alert('Incidencia actualizada'); },
        error: () => alert('Error al actualizar')
      });
    } else {
      this.service.create(incidenciaParaGuardar).subscribe({
        next: () => { this.cerrarModal(); this.cargarIncidencias(); alert('Incidencia creada'); },
        error: () => alert('Error al crear')
      });
    }
  }

  // --- NUEVA FUNCIÓN BORRAR ---
  borrarIncidencia(item: Incidencia) {
    if (!item.id) return;
    if (confirm(`¿Estás seguro de eliminar la incidencia: "${item.asunto}"?`)) {
      this.service.delete(item.id).subscribe({
        next: () => {
          this.cargarIncidencias();
          alert('Incidencia eliminada correctamente');
        },
        error: () => alert('Error al eliminar la incidencia')
      });
    }
  }

  abrirModal(incidencia?: Incidencia) {
    this.modalAbierto.set(true);
    if (incidencia) {
      this.esEdicion.set(true);
      this.nuevaIncidencia = { ...incidencia };
    } else {
      this.esEdicion.set(false);
      this.nuevaIncidencia = { asunto: '', ubicacion: '', prioridad: 'MEDIA', estado: 'PENDIENTE', tecnicoAsignado: null, clienteId: null };
    }
  }

  cerrarModal() { this.modalAbierto.set(false); }

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