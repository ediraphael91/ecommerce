export interface Rol {
  idRol: number;           // opcional porque se genera en el backend
  nombre: string;
  descripcion: string;
  estado: boolean;
  fcreacion: string;           // LocalDateTime → string (formato ISO)
  fmodificacion: string;       // idem
}
