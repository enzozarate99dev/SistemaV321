import { TupleType } from "typescript";
import { number } from "yup";
import { productoModel } from "./producto.model";

export interface ventasModel{
    id: number;
    nombreCliente: string;
    productos: productoModel[],
    precioTotal?: number;
    fechaDeVenta: Date;
}

export interface listadoVentas{
    ventas: ventasModel[];
}

export interface ventasCrear{
    nombreCliente: string;
    productosIds: number[];
    cantidad: number[];
}

export interface ventasPostGetModel{
    productos: productoModel[];
}

export interface nuevoVentasModel{
    nombreCliente:  string;
    productosIds: number[][];
}