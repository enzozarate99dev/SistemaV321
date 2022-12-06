export interface ventasConsumidorFinalCrear{
    nombreCliente: string;
    formaDePago: number;
    iva: number;
    tipoComprobante: string;
}

export interface ventasConsumidorFinalModel{
    id: number;
    nombreCliente: string;
    productos: productoModel[],
    precioTotal?: number;
    fechaDeVenta: Date;
    formaDePago: number;
}

export interface nuevoVentasCFModel{
    nombreCliente:  string;
    productosIds: number[][];
    formaDePago: number;
    iva: number;
    tipoComprobante: string;
}