import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard.home/dashboard.home';
import { TareasListComponent } from '../tareas/pages/tareas-list/tareas-list.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: 'tareas', component: TareasListComponent } 
];