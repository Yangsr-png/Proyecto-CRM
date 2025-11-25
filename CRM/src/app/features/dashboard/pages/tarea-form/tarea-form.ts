import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TareasService } from '../../../../services/tareas.service';
import { Tarea } from '../../../../models/tarea.model';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarea-form.html',
  styleUrls: ['./tarea-form.scss'],
})
export class TareaForm implements OnInit {
  formulario!: FormGroup;

  modoEdicion = false;
  idTarea?: number;

  cargando = false;
  error: string | null = null;

  // SELECT DE ESTADO
  estados = [
    { value: 'PENDIENTE', label: 'Pendiente' },
    { value: 'EN_PROGRESO', label: 'En progreso' },
    { value: 'COMPLETADA', label: 'Completada' },
  ];

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Crear formulario
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      fechaVencimiento: [''],
      estado: ['PENDIENTE', Validators.required],
    });

    // Detectar modo edición
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.modoEdicion = true;
        this.idTarea = +id;
        this.cargarTarea(+id);
      }
    });
  }

  private cargarTarea(id: number): void {
    this.cargando = true;
    this.error = null;

    this.tareasService.getTarea(id).subscribe({
      next: (tarea) => {
        this.formulario.patchValue(tarea);
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar la tarea';
        this.cargando = false;
      },
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const tarea: Tarea = this.formulario.value;

    this.cargando = true;
    this.error = null;

    if (this.modoEdicion && this.idTarea != null) {
      // EDITAR
      this.tareasService.actualizarTarea(this.idTarea, tarea).subscribe({
        next: () => {
          this.cargando = false;
          this.router.navigate(['/tareas']);
        },
        error: () => {
          this.error = 'Error al actualizar la tarea';
          this.cargando = false;
        },
      });
    } else {
      // CREAR
      this.tareasService.crearTarea(tarea).subscribe({
        next: () => {
          this.cargando = false;
          this.router.navigate(['/tareas']);
        },
        error: () => {
          this.error = 'Error al crear la tarea';
          this.cargando = false;
        },
      });
    }
  }

  // Validaciones rápidas
  get titulo() {
    return this.formulario.get('titulo');
  }
}