import { productoModel } from "./producto.model";

export interface presupuestoModel{
    id: number;
    nombre: string;
    precioTotal: number;
    descuento: number;
    fechaDeVenta: Date;
    productos: productoModel[];
}

export interface presupuestoCrear{
    nombre: string;
    productosIds: number[][];
    descuento: number;
}