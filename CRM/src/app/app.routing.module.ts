import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component'; // Asegurar ruta
import { ClientesTableComponent } from './components/clientes-table/clientes-table.component'; // Asegurar ruta
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // <--- CAMBIO CLAVE
  { path: 'login', component: LoginComponent },
  { 
    path: 'clientes', 
    component: ClientesTableComponent,
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }