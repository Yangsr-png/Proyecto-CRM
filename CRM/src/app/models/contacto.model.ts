export interface Contacto {
  id?: number;        
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  cargo?: string;
  clienteId?: number; 
}