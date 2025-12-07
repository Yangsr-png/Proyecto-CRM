import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.home.component.html',
  styleUrls: ['./dashboard.home.component.css']
})
export class DashboardHomeComponent {
  
  // Control del Carrusel
  slideActiva = signal<number>(0);

  // --- VISTA 0: OBJETIVOS (Intacta) ---
  objetivos = signal([
    { nombre: 'Juan Pérez', puntuacion: 16, total: 20, colorBarra: 'bg-[#1F3A47]', bgBarra: 'bg-slate-100' },
    { nombre: 'María García', puntuacion: 22, total: 20, colorBarra: 'bg-[#10B981]', bgBarra: 'bg-slate-100' },
    { nombre: 'Roberto López', puntuacion: 6, total: 20, colorBarra: 'bg-[#F97316]', bgBarra: 'bg-slate-300' }
  ]);

  // --- VISTA 1: FINANZAS (Enriquecida) ---
  finanzas = signal([
    { mes: 'Ene', valor: 40 }, { mes: 'Feb', valor: 65 }, { mes: 'Mar', valor: 85 },
    { mes: 'Abr', valor: 30 }, { mes: 'May', valor: 55 }, { mes: 'Jun', valor: 90 }
  ]);

  // Nuevo: Distribución de ingresos
  fuentesIngresos = signal([
    { nombre: 'Mantenimientos', porcentaje: 65, color: 'bg-blue-600' },
    { nombre: 'Reparaciones', porcentaje: 25, color: 'bg-orange-500' },
    { nombre: 'Instalaciones', porcentaje: 10, color: 'bg-purple-500' }
  ]);

  // --- VISTA 2: KPI / SISTEMA (Enriquecida) ---
  // Nuevo: Carga del servidor (Simulada)
incidentesPorHora = signal([2, 5, 1, 0, 0, 8, 12, 4, 3, 1, 6, 9, 2, 1, 0]);
  serviciosStatus = signal([
  { nombre: 'Flota de Vehículos', estado: '2 en Taller', color: 'text-orange-500', icon: 'local_shipping' },
    { nombre: 'Herramientas', estado: 'OK', color: 'text-green-500', icon: 'build' },
    { nombre: 'Almacén Central', estado: 'Stock Bajo', color: 'text-red-500', icon: 'inventory_2' }
  ]);

  // --- MÉTODOS ---
  cambiarSlide(indice: number) { this.slideActiva.set(indice); }

  getAnchoBarra(puntos: number, total: number): string {
    return `${Math.min((puntos / total) * 100, 100)}%`;
  }

  getIniciales(nombre: string): string {
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2);
  }
}