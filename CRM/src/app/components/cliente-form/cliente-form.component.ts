import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
  private fb = inject(FormBuilder);
  private clientesService = inject(ClientesService);

  @Output() onSave = new EventEmitter<Cliente>();
  @Output() onCancel = new EventEmitter<void>();

  isSubmitting = false;

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    cif: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{9}$/)]], // Ejemplo validación CIF
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const nuevoCliente = this.form.getRawValue() as Cliente;

    // Aquí asumimos creación (POST). Si quisieras edición, recibirías un @Input clienteId.
    this.clientesService.crearCliente(nuevoCliente).subscribe({
      next: (clienteCreado) => {
        this.isSubmitting = false;
        this.onSave.emit(clienteCreado);
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        // El interceptor ya manejará el alert o log global, 
        // pero aquí puedes mostrar un mensaje específico en el formulario si quieres.
        alert('Error al crear el cliente');
      }
    });
  }

  cancelar(): void {
    this.onCancel.emit();
    this.form.reset();
  }
}