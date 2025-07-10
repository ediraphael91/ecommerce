export interface Rol {
  idRol: number;           // opcional porque se genera en el backend
  nombre: string;
  descripcion: string;
  fcreacion: string;           // LocalDateTime → string (formato ISO)
  fmodificacion: string;       // idem
  estado: boolean;
}
