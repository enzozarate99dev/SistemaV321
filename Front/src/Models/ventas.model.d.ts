import { TupleType } from "typescript";
import { number } from "yup";
import { clienteModel } from "./clientes.model";
import { productoModel } from "./producto.model";

export interface ventasModel{
    id: number;
    clienteId: number;
    productos: productoModel[],
    precioTotal?: number;
    fechaDeVenta: Date;
    formaDePago: string;
    adeudada: number;
    cliente: clienteModel;
}

export interface listadoVentas{
    ventas: ventasModel[];
}

export interface ventasCrear{
    clienteId: number;
    efectivo: boolean;
    ctaCorriente: boolean;
    transferencia: boolean;
}

export interface ventaCancelar{
    pago: number;
}

export interface ventasPostGetModel{
    productos: productoModel[];
}

export interface nuevoVentasModel{
    clienteId:  number;
    productosIds: number[][];
    formaDePago: string;
}