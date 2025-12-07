import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard.home/dashboard.home';
import { TareasListComponent } from '../tareas/pages/tareas-list/tareas-list.component';
import { IncidenciasListComponent } from '../incidencias/pages/incidencias-list/incidencias-list.component'; 
import { UsuariosListComponent } from '../usuarios/pages/usuarios-list/usuarios-list.component'; 

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: 'tareas', component: TareasListComponent },
  { path: 'incidencias', component: IncidenciasListComponent },
  { path: 'usuarios', component: UsuariosListComponent }
];