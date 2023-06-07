import { TupleType } from "typescript";
import { number } from "yup";
import { clienteModel } from "./clientes.model";
import { productoDTO, productoModel } from "./producto.model";

//nuevas interfaces
export interface ventaCreacionDTO {
  clienteId: number;
  // tratamientoImpositivo: number;
  ventaLines: ventaLineCreacion[];
  pagos: pagoCreacion[];
  descuento?: number;
  sucursalId: number;
}

export interface ventaLine {
  id_venta_line: number;
  ventaId: number;
  precioUnitario: number;
  cantidad: number;
  iva: number;
  producto: productoModel;
}

export interface ventaLineCreacion {
  cantidad: number;
  productoId: number;
}

export interface pagoCreacion {
  importe: number;
  metodosDePagoIds: number[];
}
export interface pagos {
  id_pago: number;
  importe: number;
  fecha: Date;
  metodos: metodosDePago[];
}
export interface metodosDePago {
  id_metodo: number;
  nombreMetodo: string;
}

//viejas
export interface ventasModel {
  id_venta: number;
  clienteId: number;
  sucursalId: number;
  productos: productoModel[];
  precioTotal?: number;
  fechaDeVenta: Date;
  formaDePago: number;
  tratamientoImpositivo: number;
  tipoComprobante: string;
  adeudada: number;
  cliente: clienteModel;
  idComprobante: number;
  ventaLine: ventaLine[];
  pagos: pagos[];
}

export interface listadoVentas {
  ventas: ventasModel[];
}

export interface ventasCrear {
  id_cliente: number;
  formaDePago: number;
  tratamientoImpositivo: number;
  tipoComprobante: string;
  iva: number;
}

export interface ventaCancelar {
  pago: number;
}

export interface ventasPostGetModel {
  productos: productoModel[];
}

export interface nuevoVentasModel {
  clienteId: number;
  productosIds: number[][];
  formaDePago: number;
  tratamientoImpositivo?: number;
  tipoComprobante: string;
  iva: number;
}
