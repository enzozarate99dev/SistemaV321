import { comprasModel } from "./compras.model";

export interface proveedoresModel{
    id: number;
    nombre: string;
    email: string;
    direccion: string;
    telefono: string;
    compras: comprasModel[];
}

export interface proveedoresCrear{
    nombre: string;
    email:string;
    direccion: string;
    telefono: string;
}