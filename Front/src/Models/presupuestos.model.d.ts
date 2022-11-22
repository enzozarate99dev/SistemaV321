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

export interface presupuestoCrearPrev{
    nombre: string,
    descuento: number
}

export interface modeloExcel{
    Id?: string;
    Nombre?: string;
    Precio?: string;
    Descuento?: string;
    Fecha?: string;
    IdProducto?: string;
    NombreProducto?: string;
    PrecioUnitario?: number;
    Cantidad?: number;
    Codigo?:string;
    Categoria?: string;
    Descripcion?: string;
}

