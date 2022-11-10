
export interface usuariosModel{
    userName: string;
    email: string;
    role: string;
}

export interface usuariosCrear{
    userName: string;
    email: string;
    admin: boolean;
    cajero: boolean;
    password: string;
}

export interface usuariosEnviar{
    userName: string;
    email: string;
    role: string;
    password: string;
}