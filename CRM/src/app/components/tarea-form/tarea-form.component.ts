import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { toSignal } from '@angular/core/rxjs-interop'; 

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarea-form.component.html'
})
export class TareaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientesService = inject(ClientesService);

  @Output() onSave = new EventEmitter<any>(); 
  @Output() onCancel = new EventEmitter<void>();

  clientes = toSignal(this.clientesService.getClientes(), { initialValue: [] });

  isSubmitting = false;

  form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: [''],
    fechaVencimiento: ['', Validators.required],
    clienteId: [null as number | null, Validators.required]
  });

  ngOnInit() {}

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const val = this.form.value;

    const tareaParaBackend = {
      titulo: val.titulo,
      descripcion: val.descripcion,
      fechaVencimiento: val.fechaVencimiento,
      estado: 'PENDIENTE', 
      cliente: { 
        id: val.clienteId 
      },
      usuario: { 
        id: 1 
      }
    };

    this.onSave.emit(tareaParaBackend);
  }

  cancelar() {
    this.onCancel.emit();
  }
}