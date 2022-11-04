import { TupleType } from "typescript";
import { number } from "yup";
import { productoModel } from "./producto.model";

export interface ventasModel{
    id: number;
    nombreCliente: string;
    productos: productoModel[],
    precioTotal?: number;
    fechaDeVenta: Date;
    formaDePago: string;
}

export interface listadoVentas{
    ventas: ventasModel[];
}

export interface ventasCrear{
    nombreCliente: string;
    productosIds: number[];
    cantidad: number[];
    efectivo: boolean;
    ctaCorriente: boolean;
    transferencia: boolean;
}

export interface ventasPostGetModel{
    productos: productoModel[];
}

export interface nuevoVentasModel{
    nombreCliente:  string;
    productosIds: number[][];
    formaDePago: string;
}