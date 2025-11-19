import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes-table.component.html',
  styleUrls: ['./clientes-table.component.css']
})
export class ClientesTableComponent implements OnInit {

  clientes: Cliente[] = [];

  filtroNombre: string = '';
  filtroCif: string = '';

  cargando: boolean = false;
  error: string | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.error = null;

    const filtros: any = {};

    if (this.filtroNombre.trim() !== '') {
      filtros.nombre = this.filtroNombre.trim();
    }

    if (this.filtroCif.trim() !== '') {
      filtros.cif = this.filtroCif.trim();
    }

    this.clientesService.getClientes(filtros).subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar los clientes';
        this.cargando = false;
      }
    });
  }

  onFiltrar(): void {
    this.cargarClientes();
  }

  onLimpiarFiltros(): void {
    this.filtroNombre = '';
    this.filtroCif = '';
    this.cargarClientes();
  }
}
