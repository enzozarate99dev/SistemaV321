export interface productoModel {
  id_producto: number;
  nombre: string;
  precio: number;
  precioF: number;
  cantidad: number;
  codigo?: string;
  categoria?: string;
  descripcion?: string;
  foto?: string;
  label?: string;
}

export interface homePage {
  disponibles: productoModel[];
  sinStock: productoModel[];
}

export interface productoCrear {
  nombre: string;
  precio: number;
  cantidad: number;
  codigo?: string;
  categoria?: string;
  descripcion?: string;
  foto?: File;
  fotoURL?: strng;
}

export interface actualizar {
  ids?: number[];
  ids2?: number[];
  valor?: number;
  aumentar?: boolean;
  descontar?: boolean;
}

export interface productoDTO {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  codigo: string;
  categoria: string;
  descripcion: string;
  foto?: string;
}
