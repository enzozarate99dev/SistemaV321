
export interface productoModel{
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    codigo?:string;
    categoria?: string;
    descripcion?: string;
    foto?:string;
}

export interface homePage{
    disponibles: productoModel[];
    sinStock: productoModel[];
}

export interface productoCrear{
    nombre: string;
    precio: number;
    cantidad?: number;
    codigo?:string;
    categoria?: string;
    descripcion?: string
    foto?: File
    fotoURL?: strng
}

export interface actualizar{
    ids?: number[];
    valor?: number;
    aumentar?:boolean;
    descontar?:boolean;
}

