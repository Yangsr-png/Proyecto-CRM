import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientesService } from '../../../../services/clientes.service';
import { Cliente } from '../../../../models/cliente.model';




@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.scss'],
})
export class ClienteForm implements OnInit {
  formulario!: FormGroup;

  modoEdicion = false;
  idCliente?: number;

  cargando = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Crear formulario vacío
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      cif: ['', [Validators.required, Validators.maxLength(20)]],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
    });

    // 2. Mirar si venimos en modo edición (/dashboard/clientes/:id/editar)
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.modoEdicion = true;
        this.idCliente = +id;
        this.cargarCliente(+id);
      }
    });
  }

  private cargarCliente(id: number): void {
    this.cargando = true;
    this.error = null;

    this.clientesService.getCliente(id).subscribe({
      next: (cliente: Cliente) => {
        this.formulario.patchValue(cliente);
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar los datos del cliente';
        this.cargando = false;
      },
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const cliente: Cliente = this.formulario.value;
    this.cargando = true;
    this.error = null;

    if (this.modoEdicion && this.idCliente != null) {
      // PUT (actualizar)
      this.clientesService
        .actualizarCliente(this.idCliente, cliente)
        .subscribe({
          next: () => {
            this.cargando = false;
            this.router.navigate(['/clientes']);
          },
          error: (err) => {
            console.error(err);
            this.error = 'Error al actualizar el cliente';
            this.cargando = false;
          },
        });
    } else {
      // POST (crear)
      this.clientesService.crearCliente(cliente).subscribe({
        next: () => {
          this.cargando = false;
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al crear el cliente';
          this.cargando = false;
        },
      });
    }
  }

  // getters para el HTML
  get nombre() {
    return this.formulario.get('nombre');
  }
  get cif() {
    return this.formulario.get('cif');
  }
  get email() {
    return this.formulario.get('email');
  }
}
