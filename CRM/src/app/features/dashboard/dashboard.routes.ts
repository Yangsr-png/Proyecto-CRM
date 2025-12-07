import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard.home/dashboard.home';
import { IncidenciasListComponent } from '../incidencias/pages/incidencias-list/incidencias-list.component'; 
import { UsuariosListComponent } from '../usuarios/pages/usuarios-list/usuarios-list.component'; 

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: 'incidencias', component: IncidenciasListComponent },
  { path: 'usuarios', component: UsuariosListComponent }
];