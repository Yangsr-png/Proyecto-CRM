export interface Incidencia {
  id?: number;
  asunto: string;
  ubicacion?: string; // Se rellenará automáticamente con la dirección del cliente
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  estado: 'PENDIENTE' | 'EN_CURSO' | 'RESUELTO';
  fecha?: string;
  
  // Relaciones
  clienteId?: number; 
  tecnicoAsignado?: {
    id: number;
    nombre: string; 
    email?: string;
  };
}