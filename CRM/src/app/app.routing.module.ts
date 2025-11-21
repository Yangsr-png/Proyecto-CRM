import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ClientesTableComponent } from './components/clientes-table/clientes-table.component';

const routes: Routes = [
  // 1. Redirección inicial al login correcto
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // 2. Carga Perezosa (Lazy Loading) del Módulo de Auth
  // Esto habilita las rutas: /auth/login y /auth/register
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // 3. Carga Perezosa del Dashboard
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard] 
  },

  // 4. Ruta de Clientes (Protegida)
  { 
    path: 'clientes', 
    component: ClientesTableComponent,
    canActivate: [authGuard] 
  },

  // 5. Cualquier ruta desconocida redirige al login correcto
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }