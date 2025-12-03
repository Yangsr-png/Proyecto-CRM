import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';
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

  // --- SIGNALS (Estado) ---
  clientes = signal<Cliente[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Filtros
  filtroNombre = signal<string>('');
  filtroEstado = signal<string>('');

  // Estado de Modales
  modalClienteAbierto = signal<boolean>(false);
  modalContactoAbierto = signal<boolean>(false);
  
  // ID del cliente al que vamos a añadir un contacto
  clienteSeleccionadoId: number | null = null;

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.loading.set(true);
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
        this.error.set('Error al cargar clientes');
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

  // --- MODAL NUEVO CLIENTE ---
  abrirModalCliente() { this.modalClienteAbierto.set(true); }
  cerrarModalCliente() { this.modalClienteAbierto.set(false); }
  
  onClienteGuardado(cliente: Cliente) {
    this.cerrarModalCliente();
    this.cargarClientes();
    alert(`Cliente "${cliente.nombre}" creado con éxito.`);
  }

  // --- MODAL NUEVO CONTACTO (Lo que faltaba) ---
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

  onContactoGuardado() {
    this.cerrarModalContacto();
    alert('Contacto añadido correctamente.');
  }
}