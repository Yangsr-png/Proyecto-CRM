import { Cliente } from "./cliente.model";

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion?: string;
  fechaVencimiento?: string;
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA' | 'CANCELADA';
  cliente?: Cliente; // Para mostrar el nombre del cliente
  clienteId?: number; // Para enviar al backend al crear
  usuarioId?: number;
}