export interface usuariosModel {
  userName: string;
  email: string;
  role: string;
  sucursalId: number;
}

export interface usuariosCrear {
  nombre: string;
  email: string;
  admin: boolean;
  cajero: boolean;
  password: string;
  sucursalId: number;
}

export interface usuariosEnviar {
  nombre: string;
  email: string;
  role: string;
  password: string;
  sucursalId: number;
}
