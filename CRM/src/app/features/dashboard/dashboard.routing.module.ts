import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard.home/dashboard.home';
import { TareaForm } from './pages/tarea-form/tarea-form';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', // Esta es la ruta raíz del módulo (ej. /dashboard)
    component: DashboardHomeComponent
  
  
  },
{
  path: 'tareas/nueva',
  component: TareaForm,
  canActivate: [authGuard]
},
{
  path: 'tareas/:id/editar',
  component: TareaForm,
  canActivate: [authGuard]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
