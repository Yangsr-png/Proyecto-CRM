export interface Incidencia {
  id: number;
  asunto: string;
  ubicacion: string; // Ej: "Oficinas Centrales"
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  estado: 'PENDIENTE' | 'EN_CURSO' | 'RESUELTO';
  tecnicoAsignado?: { // Opcional, puede no tener técnico aún
    nombre: string;
    avatar?: string; // URL de la foto
  };
  fecha: string;
}