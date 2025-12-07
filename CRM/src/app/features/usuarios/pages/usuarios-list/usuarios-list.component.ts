import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent implements OnInit {
  private service = inject(UsuariosService);
  
  usuarios = signal<Usuario[]>([]);
  modalAbierto = signal<boolean>(false);
  
  // Formulario
  nuevoUsuario: any = { 
    nombre: '', 
    email: '', 
    password: '', 
    role: 'TECNICO',
    activo: true
  };

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.service.findAll().subscribe(data => this.usuarios.set(data));
  }

  guardar() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      alert('Completa los campos obligatorios');
      return;
    }

    this.service.create(this.nuevoUsuario).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarUsuarios();
        this.nuevoUsuario = { nombre: '', email: '', password: '', role: 'TECNICO', activo: true };
        alert('Usuario creado correctamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar usuario');
      }
    });
  }

  verPerfil(user: Usuario) {
  
    alert(`Perfil de Usuario:\n\nNombre: ${user.nombre}\nEmail: ${user.email}\nRol: ${user.role}`);
  }

  abrirModal() { this.modalAbierto.set(true); }
  cerrarModal() { this.modalAbierto.set(false); }

  getRolClass(rol: string): string {
    return rol === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100';
  }

  getIniciales(nombre: string): string {
    return (nombre || '?').substring(0, 2).toUpperCase();
  }
}