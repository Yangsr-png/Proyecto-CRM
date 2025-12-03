import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], 
  templateUrl: './dashboard.home.component.html',
  styleUrls: ['./dashboard.home.component.css']
})
export class DashboardHomeComponent {
  private authService = inject(AuthService);

  // --- SIGNALS PARA DATOS (Simulando respuesta de API) ---
  
  // Datos de las tarjetas superiores
  kpis = signal({
    comunidadesActivas: 124,
    incidenciasPendientes: 15,
    tareasCompletadas: 87
  });

  // --- CONFIGURACIÓN DEL GRÁFICO (Chart.js) ---
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Ocultamos leyenda para igualar la imagen
      title: { display: false }
    },
    scales: {
      y: {
        display: false, // Ocultar eje Y como en la imagen (minimalista)
        grid: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { font: { weight: 'bold' } }
      }
    },
    elements: {
      bar: {
        borderRadius: 8, // Bordes redondeados en las barras
        backgroundColor: '#64748b', // Color gris/azulado (Slate-500)
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov' ],
    datasets: [
      { 
        data: [ 65, 30, 45, 10, 35, 60, 100, 45, 45, 75, 10 ], 
        label: 'Incidencias',
        backgroundColor: '#5A6B84', // Color exacto aproximado de la imagen
        hoverBackgroundColor: '#1e293b'
      }
    ]
  };

  logout(): void {
    this.authService.logout();
  }
}