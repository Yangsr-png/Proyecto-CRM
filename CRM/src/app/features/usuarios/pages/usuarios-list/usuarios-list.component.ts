import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent {
  private service = inject(UsuariosService);
  
  usuarios = signal<Usuario[]>([]);

  ngOnInit() {
    this.service.findAll().subscribe(data => this.usuarios.set(data));
  }

  // --- Helpers de Diseño ---

  getRolClass(rol: string): string {
    return rol === 'ADMIN' 
      ? 'bg-purple-50 text-purple-700 border-purple-100' 
      : 'bg-blue-50 text-blue-700 border-blue-100';
  }

  // Genera iniciales (ej: Juan Pérez -> JP)
  getIniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}