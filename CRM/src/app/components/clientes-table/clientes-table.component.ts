import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Servicios y Modelos
import { ClientesService } from '../../services/clientes.service';
import { ContactosService } from '../../services/contactos.service';
import { Cliente } from '../../models/cliente.model';
import { Contacto } from '../../models/contacto.model';

// Componentes (Modales)
import { ContactoFormComponent } from '../contacto-form/contacto-form.component';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-clientes-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactoFormComponent, ClienteFormComponent],
  templateUrl: './clientes-table.component.html',
  styleUrls: ['./clientes-table.component.css']
})
export class ClientesTableComponent implements OnInit {
  
  private clientesService = inject(ClientesService);
  private contactosService = inject(ContactosService);

  // --- ESTADO PRINCIPAL (Signals) ---
  clientes = signal<Cliente[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Filtros
  filtroNombre = signal<string>('');
  filtroEstado = signal<string>('');

  // --- ESTADO DE MODALES ---
  modalClienteAbierto = signal<boolean>(false);        
  modalContactoAbierto = signal<boolean>(false);       
  modalListaContactosAbierto = signal<boolean>(false); 

  // Datos temporales para los modales
  clienteSeleccionadoId: number | null = null; 
  contactosDelCliente = signal<Contacto[]>([]); 
  clienteVisualizado: string = '';
  
  // Variable para edición
  clienteAEditar: Cliente | null = null; 

  ngOnInit(): void {
    this.cargarClientes();
  }

  // --- CARGA DE DATOS ---
  cargarClientes(): void {
    this.loading.set(true);
    this.error.set(null);

    const filtros = {
      nombre: this.filtroNombre(),
      estado: this.filtroEstado()
    };

    this.clientesService.getClientes(filtros).subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al conectar con el servidor.');
        this.loading.set(false);
      }
    });
  }

  onFiltrar(): void {
    this.cargarClientes();
  }

  onLimpiarFiltros(): void {
    this.filtroNombre.set('');
    this.filtroEstado.set('');
    this.cargarClientes();
  }

  // --- LÓGICA MODAL: CLIENTE (CREAR / EDITAR) ---
  abrirModalCliente() { 
    this.clienteAEditar = null; // Modo creación
    this.modalClienteAbierto.set(true); 
  }

  abrirModalEditar(cliente: Cliente) {
    this.clienteAEditar = cliente; // Modo edición
    this.modalClienteAbierto.set(true);
  }
  
  cerrarModalCliente() { 
    this.modalClienteAbierto.set(false);
    this.clienteAEditar = null; // Limpiar selección
  }
  
  onClienteGuardado(cliente: Cliente) {
    this.cerrarModalCliente();
    this.cargarClientes(); 
    const accion = this.clienteAEditar ? 'actualizado' : 'creado';
    alert(`Cliente "${cliente.nombre}" ${accion} correctamente.`);
  }

  // --- LÓGICA DE BORRADO ---
  borrarCliente(cliente: Cliente) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${cliente.nombre}? Esta acción no se puede deshacer.`)) {
      if (cliente.id) {
        this.clientesService.eliminarCliente(cliente.id).subscribe({
          next: () => {
            alert('Cliente eliminado correctamente.');
            this.cargarClientes();
          },
          error: (err) => {
            console.error(err);
            alert('Error al eliminar el cliente.');
          }
        });
      }
    }
  }

  // --- LÓGICA MODAL: AÑADIR CONTACTO ---
  abrirModalContacto(cliente: Cliente) {
    if (cliente.id) {
      this.clienteSeleccionadoId = cliente.id;
      this.modalContactoAbierto.set(true);
    }
  }

  cerrarModalContacto() {
    this.clienteSeleccionadoId = null;
    this.modalContactoAbierto.set(false);
  }

  onContactoGuardado(contacto: Contacto) {
    this.cerrarModalContacto();
    alert('Contacto añadido correctamente.');
  }

  // --- LÓGICA MODAL: VER LISTA DE CONTACTOS ---
  abrirModalListaContactos(cliente: Cliente) {
    if (!cliente.id) return;

    this.clienteVisualizado = cliente.nombre;
    this.modalListaContactosAbierto.set(true);
    
    this.contactosService.getByCliente(cliente.id).subscribe({
      next: (data) => this.contactosDelCliente.set(data),
      error: (err) => console.error('Error cargando contactos', err)
    });
  }

  cerrarModalListaContactos() {
    this.modalListaContactosAbierto.set(false);
    this.contactosDelCliente.set([]); 
  }
}