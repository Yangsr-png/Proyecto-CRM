import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Servicios y Modelos
import { ClientesService } from '../../services/clientes.service';
import { ContactosService } from '../../services/contactos.service';
import { Cliente } from '../../models/cliente.model';
import { Contacto } from '../../models/contacto.model';

import { ContactoFormComponent } from '../contacto-form/contacto-form.component';

@Component({
  selector: 'app-clientes-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactoFormComponent, RouterLink],
  templateUrl: './clientes-table.component.html'
})
export class ClientesTableComponent implements OnInit {
  
  private clientesService = inject(ClientesService);
  private contactosService = inject(ContactosService);

  // --- SIGNALS (Igual que en Incidencias) ---
  clientes = signal<Cliente[]>([]);
  loading = signal<boolean>(false);
  
  // Filtros
  filtroNombre = signal<string>('');
  filtroEstado = signal<string>('');

  // Control de Modales
  modalClienteAbierto = signal<boolean>(false);        
  modalContactoAbierto = signal<boolean>(false);       
  modalListaContactosAbierto = signal<boolean>(false); 

  // Estado Edición
  esEdicion = signal<boolean>(false);
  
  // Objeto para el Formulario (Mismo modelo)
  nuevoCliente: Cliente = {
    nombre: '',
    cif: '',
    direccion: '',
    email: '',
    telefono: '',
    estado: 'ACTIVO'
  };

  // Variables para lógica de contactos
  clienteSeleccionadoId: number | null = null; 
  contactosDelCliente = signal<Contacto[]>([]); 
  clienteVisualizado: string = '';

  ngOnInit(): void {
    this.cargarClientes();
  }

  // --- CARGA DE DATOS (Híbrida) ---
  cargarClientes(): void {
    this.loading.set(true);
    const filtros = {
      nombre: this.filtroNombre(),
      estado: this.filtroEstado()
    };

    // El servicio ya mezcla Mocks + Backend
    this.clientesService.getClientes(filtros).subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false); // El servicio devuelve mocks en catchError, así que esto es solo limpieza
      }
    });
  }

  onFiltrar(): void { this.cargarClientes(); }
  
  onLimpiarFiltros(): void {
    this.filtroNombre.set('');
    this.filtroEstado.set('');
    this.cargarClientes();
  }

  // --- GUARDAR (Crear / Editar) ---
  guardar() {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.cif) {
      alert('Por favor, indica al menos el Nombre y el CIF.');
      return;
    }

    if (this.esEdicion() && this.nuevoCliente.id) {
      // EDITAR
      this.clientesService.actualizarCliente(this.nuevoCliente.id, this.nuevoCliente).subscribe({
        next: () => {
          this.cerrarModalCliente();
          this.cargarClientes();
        },
        error: () => alert('Error al actualizar (Backend no disponible, intenta con mocks)')
      });
    } else {
      // CREAR
      this.clientesService.crearCliente(this.nuevoCliente).subscribe({
        next: () => {
          this.cerrarModalCliente();
          this.cargarClientes();
        },
        error: () => alert('Error al crear (Backend no disponible)')
      });
    }
  }

  // --- GESTIÓN DE MODALES ---
  abrirModalCliente(cliente?: Cliente) { 
    this.modalClienteAbierto.set(true);
    if (cliente) {
      this.esEdicion.set(true);
      this.nuevoCliente = { ...cliente }; // Copia para no editar la tabla en vivo
    } else {
      this.esEdicion.set(false);
      // Resetear formulario
      this.nuevoCliente = {
        nombre: '', cif: '', direccion: '', email: '', telefono: '', estado: 'ACTIVO'
      };
    }
  }
  
  cerrarModalCliente() { 
    this.modalClienteAbierto.set(false);
  }

  borrarCliente(cliente: Cliente) {
    if (!cliente.id) return;
    if (confirm(`¿Eliminar a ${cliente.nombre}?`)) {
      this.clientesService.eliminarCliente(cliente.id).subscribe({
        next: () => this.cargarClientes(),
        error: () => alert('Error al eliminar')
      });
    }
  }

  // --- ESTILOS VISUALES (Igual que Incidencias) ---
  getEstadoClass(estado?: string): string {
    switch(estado) {
      case 'ACTIVO': return 'bg-green-100 text-green-700 border-green-200';
      case 'INACTIVO': return 'bg-red-100 text-red-700 border-red-200';
      case 'POTENCIAL': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  }

  // --- MÉTODOS DE CONTACTOS ---
  abrirModalContacto(cliente: Cliente) {
    if (cliente.id) {
      this.clienteSeleccionadoId = cliente.id;
      this.modalContactoAbierto.set(true);
    }
  }
  cerrarModalContacto() { this.modalContactoAbierto.set(false); }
  onContactoGuardado(c: Contacto) { this.cerrarModalContacto(); alert('Contacto guardado'); }

  abrirModalListaContactos(cliente: Cliente) {
    if (!cliente.id) return;
    this.clienteVisualizado = cliente.nombre;
    this.modalListaContactosAbierto.set(true);
    this.contactosService.getByCliente(cliente.id).subscribe(data => this.contactosDelCliente.set(data));
  }
  cerrarModalListaContactos() { this.modalListaContactosAbierto.set(false); }
}