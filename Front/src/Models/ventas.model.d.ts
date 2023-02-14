import { TupleType } from "typescript";
import { number } from "yup";
import { clienteModel } from "./clientes.model";
import { productoDTO, productoModel } from "./producto.model";

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

//nuevas interfaces
export interface ventaCreacionDTO {
  id_cliente: number;
  fechaDeVenta: Date;
  tratamientoImpositivo: number;
  ventaLines: ventaLineCreacion[];
  ventaOrders?: VentaOrders[];
}

export interface ventaLine {
  id_ventaLine: number;
  id_venta: number;
  precioUnitario: number;
  cantidad: number;
  iva: number;
  producto: productoModel[];
}

export interface ventaLineCreacion {
  id_producto: number;
  precioUnitario: number;
  cantidad: number;
  iva: number;
  producto: productoModel[];
}

export interface ventaOrders {
  id_venta_order: number;
  id_venta: number;
  fechaOrder: Date;
  tipoComprobante: string;
  ventaOrderPagos: ventaOrderPagos[];
}

export interface ventaOrderCreacion {
  id_venta: number;
  fechaOrder: Date;
  tipoComprobante: string;
  ventaOrderPagos: ventaOrderPagos[];
}

export interface ventaOrderPagos {
  pagoId: number;
  ventaOrderId: number;
  pago: pagos[];
}
export interface pagos {
  precioTotalAPagar: number;
  fechaDePago?: Date;
  metodoDePago: metodosDePago[];
}
export interface metodosDePago {
  id_pago: number;
  formaDePago: string;
}
