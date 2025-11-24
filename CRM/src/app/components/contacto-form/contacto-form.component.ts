import { Component, inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/contacto.model';

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Importamos esto para usar formularios
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.scss'] // Si usas .css cambia esto a .css
})
export class ContactoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactosService = inject(ContactosService);

  // INPUT: Necesitamos saber a qué cliente pertenece este contacto
  @Input({ required: true }) clienteId!: number;

  // INPUT: (Opcional) Si pasamos un contacto, es para editarlo
  @Input() contactoParaEditar?: Contacto;

  // OUTPUT: Avisamos al padre cuando terminamos de guardar/editar
  @Output() onSave = new EventEmitter<Contacto>();
  @Output() onCancel = new EventEmitter<void>();

  // Definición del formulario con validaciones
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]], // 9 dígitos
    cargo: ['']
  });

  isSubmitting = false;

  ngOnInit(): void {
    // Si nos pasan un contacto para editar, rellenamos el formulario
    if (this.contactoParaEditar) {
      this.form.patchValue({
        nombre: this.contactoParaEditar.nombre,
        apellido: this.contactoParaEditar.apellido,
        email: this.contactoParaEditar.email,
        telefono: this.contactoParaEditar.telefono || '',
        cargo: this.contactoParaEditar.cargo || ''
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca errores en rojo
      return;
    }

    this.isSubmitting = true;
    const datos = this.form.getRawValue() as Contacto;

    let peticion$;

    if (this.contactoParaEditar && this.contactoParaEditar.id) {
      // MODO EDICIÓN: PUT /api/contactos/{id}
      peticion$ = this.contactosService.update(this.contactoParaEditar.id, datos);
    } else {
      // MODO CREACIÓN: POST /api/contactos/cliente/{clienteId}
      peticion$ = this.contactosService.create(this.clienteId, datos);
    }

    peticion$.subscribe({
      next: (resultado) => {
        this.isSubmitting = false;
        this.onSave.emit(resultado); // Emitimos el nuevo contacto hacia arriba
        this.form.reset();
      },
      error: (err) => {
        console.error('Error:', err);
        this.isSubmitting = false;
        alert('Error al guardar el contacto.');
      }
    });
  }

  cancelar(): void {
    this.onCancel.emit();
    this.form.reset();
  }
}