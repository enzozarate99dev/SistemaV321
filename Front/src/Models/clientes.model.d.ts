import { ventasModel } from "./ventas.model";

export interface clienteModel {
  id_cliente: number;
  nombreYApellido: string;
  email: string;
  telefono: string;
  domicilio: string;
  codigoPostal: string;
  localidad: string;
  nroDocumento: string;
  percibeIIBB: boolean;
  percibeIVA: boolean;
  provincia: string;
  razonSocial: string;
  tipoDocumento: number;
  deuda?: number;
  nroIngresos?: string;
  label?: string;
}

export interface clientePagos {
  clienteId: number;
  fecha?: Date;
  metodoDePago: number;
  debe?: number;
  haber?: number;
  saldo: number;
  accciones?: void;
}

export interface clienteCrear {
  nombreYApellido: string;
  email?: string;
  telefono?: string;
  domicilio: string;
  codigoPostal?: string;
  localidad: string;
  nroDocumento: string;
  percibeIIBB?: boolean;
  percibeIVA?: boolean;
  provincia: string;
  razonSocial: string;
  tipoDocumento?: number;
  nroIngresos?: string;
}
