import { ventasModel } from "./ventas.model";

export interface clienteModel {
  id: number;
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
  label?: string;
  acciones?: any;
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
}
