import { Component, EventEmitter, Output, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private clientesService = inject(ClientesService);

  @Input() clienteParaEditar: Cliente | null = null; // <--- NUEVO INPUT
  @Output() onSave = new EventEmitter<Cliente>();
  @Output() onCancel = new EventEmitter<void>();

  isSubmitting = false;

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    cif: ['', [Validators.required]],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    estado: ['ACTIVO'] // Campo estado añadido
  });

  // Detectar cambios si nos pasan un cliente para editar
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clienteParaEditar'] && this.clienteParaEditar) {
      this.form.patchValue({
        nombre: this.clienteParaEditar.nombre,
        cif: this.clienteParaEditar.cif,
        direccion: this.clienteParaEditar.direccion,
        email: this.clienteParaEditar.email,
        telefono: this.clienteParaEditar.telefono,
        estado: this.clienteParaEditar.estado || 'ACTIVO'
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const datosForm = this.form.getRawValue() as Cliente;

    let peticion$;
    if (this.clienteParaEditar && this.clienteParaEditar.id) {
      // MODO EDICIÓN
      peticion$ = this.clientesService.actualizarCliente(this.clienteParaEditar.id, datosForm);
    } else {
      // MODO CREACIÓN
      peticion$ = this.clientesService.crearCliente(datosForm);
    }

    peticion$.subscribe({
      next: (clienteGuardado) => {
        this.isSubmitting = false;
        this.onSave.emit(clienteGuardado);
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        alert('Error al guardar.');
      }
    });
  }

  cancelar(): void {
    this.onCancel.emit();
    this.form.reset();
  }
}