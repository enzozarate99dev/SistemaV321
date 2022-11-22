export interface ventasConsumidorFinalCrear{
    nombreCliente: string;
    efectivo: boolean;
    transferencia: boolean;
}

export interface ventasConsumidorFinalModel{
    id: number;
    nombreCliente: string;
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