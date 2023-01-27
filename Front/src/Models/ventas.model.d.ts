import { TupleType } from "typescript";
import { number } from "yup";
import { clienteModel } from "./clientes.model";
import { productoModel } from "./producto.model";

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
  clienteId: number;
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
