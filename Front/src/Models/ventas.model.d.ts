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
}

export interface ventaLine {
  id_venta_line: number;
  id_venta: number;
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
export interface metodoDePago {}

//viejas
export interface ventasModel {
  id: number;
  clienteId: number;
  productos: productoModel[];
  precioTotal?: number;
  fechaDeVenta: Date;
  formaDePago: number;
  tratamientoImpositivo: number;
  tipoComprobante: string;
  adeudada: number;
  cliente: clienteModel;
  idComprobante: number;
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
