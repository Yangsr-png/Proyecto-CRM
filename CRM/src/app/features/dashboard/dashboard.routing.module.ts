import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard.home/dashboard.home';

const routes: Routes = [
  {
    path: '', // Esta es la ruta raíz del módulo (ej. /dashboard)
    component: DashboardHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }