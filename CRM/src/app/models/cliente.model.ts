export interface Cliente {
  id?: number;
  nombre: string;
  cif: string;
  direccion: string;
  email: string;
  telefono: string;
  estado?: string; 
}