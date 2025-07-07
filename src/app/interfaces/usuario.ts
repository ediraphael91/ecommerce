//export interface Usuario {
  //usuario: string;
  //nombre: string;
  //apellido: string;
  //sexo: string
//}

export interface Usuario {
  idUsuario: number;           // opcional porque se genera en el backend
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  fnacimiento: string;          // LocalDate → string (formato 'YYYY-MM-DD')
  password: string;
  estado: boolean;
  fcreacion: string;           // LocalDateTime → string (formato ISO)
  fmodificacion: string;       // idem
}
