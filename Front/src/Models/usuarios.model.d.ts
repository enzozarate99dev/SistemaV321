
export interface usuariosModel{
    userName: string;
    email: string;
    role: string;
}

export interface usuariosCrear{
    nombre: string;
    email: string;
    admin: boolean;
    cajero: boolean;
    password: string;
}

export interface usuariosEnviar{
    nombre: string;
    email: string;
    role: string;
    password: string;
}
