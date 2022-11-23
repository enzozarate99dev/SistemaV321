import { productoModel } from "./producto.model";

export interface comprasModel{
    id: number;
    proveedorId: number;
    precioTotal: number;
    fechaDeCompra: Date;
    productos: productoModel[];
}


export interface comprasCrearPrev{
    proveedorId: number;
}

export interface comprasCrear{
    proveedorId: number;
    productosIds: number[][];
}