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
  // ventaOrders: ventaOrderCreacion[];
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
  // producto: productoModel;
  // iva: number;
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
  ventaOrderPagos: ventaOrderPagosCreacion[];
}

// export interface ventaOrderPagos {
//   pagoId: number;
//   ventaOrderId: number;
//   pago: pago[];
// }

// export interface ventaOrderPagosCreacion {
//   pagoId: number;
//   ventaOrderId: number;
//   pago: pagoCreacion[];
// }

export interface pago {
  precioTotalAPagar: number;
  fechaDePago?: Date;
  metodoDePago: number;
}

export interface pagoCreacion {
  importe: number;
  // fechaDePago: Date;
  metodoDePago: number;
}

// export interface metodosDePagoCreacion {
//   id_pago: number;
//   formaDePago: string;
// }

// export interface metodosDePago {
//   id_pago: number;
//   formaDePago: string;
// }

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
