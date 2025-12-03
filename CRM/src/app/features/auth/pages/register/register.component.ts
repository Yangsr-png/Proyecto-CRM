import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inyectar el servicio
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Llamada al servicio real que conecta con Spring Boot
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('Registro exitoso');
          // La redirección ya la hace el servicio, pero por seguridad:
          // this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Error al registrarse. El usuario podría ya existir.');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // Getters para usar en el HTML
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
}