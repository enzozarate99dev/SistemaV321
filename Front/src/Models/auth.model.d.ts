
export interface claim{
    nombre: string;
    valor: string
}

export interface credencialesUsuario{
    nombre: string;
    email?: string;
    password: string;
    role?: string;
}

export interface respuestaAutenticacion{
    token: string;
    expiracion: Date;
}