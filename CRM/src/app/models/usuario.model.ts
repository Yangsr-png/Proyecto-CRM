export interface Usuario {
  id: number;
  nombre: string; 
  email: string;
  role: 'ADMIN' | 'TECNICO' | 'USER';
  activo?: boolean;
  avatar?: string;
}