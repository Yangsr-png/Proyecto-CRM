export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  rol: 'ADMIN' | 'TECNICO';
  activo: boolean; // Para mostrar el puntito verde/rojo
  avatar?: string; // URL de la imagen (opcional)
  tareasAsignadas?: number; // Para mostrar carga de trabajo
}