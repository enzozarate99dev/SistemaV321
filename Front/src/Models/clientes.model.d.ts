import { ventasModel } from "./ventas.model";

export interface clienteModel{
    id: number;
    nombreYApellido:string;
    email: string;
    telefono: string;
    domicilio: string;
    deuda: number;
}

export interface clienteCrear{
    nombreYApellido:string;
    email: string;
    telefono: string;
    domicilio: string;
}