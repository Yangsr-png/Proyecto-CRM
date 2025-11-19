import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Redirige a la ruta protegida por defecto
    pathMatch: 'full'
  },
  {
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.module')
                            .then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
                            .then(m => m.DashboardModule),
   
    canActivate: [authGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }