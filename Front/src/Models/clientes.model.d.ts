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

export interface operacionesCliente {
  clienteId: number;
  id_venta: number;
  fechaDeVenta: Date;
  precioTotal: number;
  tipoComprobante: string;
  pagada: boolean;
  pagos: [];
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
