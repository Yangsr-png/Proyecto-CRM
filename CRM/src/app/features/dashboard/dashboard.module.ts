import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

import { DashboardRoutingModule } from './dashboard.routing.module'; 
import { DashboardHomeComponent } from './pages/dashboard.home/dashboard.home';
import { ClientesTableComponent } from '../../components/clientes-table/clientes-table.component';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    // 2. IMPORTANTE: Aquí va la Tabla (porque standalone: true)
    // ¡Si lo pones en 'declarations' fallará! Tiene que ir en 'imports'.
    ClientesTableComponent 
  ]
})
export class DashboardModule { }