export interface ventasConsumidorFinalCrear{
    nombreCliente: string;
    productosIds: number[];
    cantidad: number[];
    efectivo: boolean;
    transferencia: boolean;
}

export interface ventasConsumidorFinalModel{
    id: number;
    nombreCliente: number;
    productos: productoModel[],
    precioTotal?: number;
    fechaDeVenta: Date;
    formaDePago: string;
}

export interface nuevoVentasCFModel{
    nombreCliente:  string;
    productosIds: number[][];
    formaDePago: string;
}