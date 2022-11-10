import axios from "axios"
import { urlCuentas } from "../../Generales/endpoints"
import { respuestaAutenticacion } from "../../Models/auth.model"
import { usuariosCrear, usuariosEnviar, usuariosModel } from "../../Models/usuarios.model"

export async function registrar(credenciales: usuariosEnviar){
    const res = await axios.post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales)
    return res
}

export async function getUsuarios(){
    const res = await axios.get<usuariosModel[]>(`${urlCuentas}`)
    return res
}

export async function borrar(nombre: string){
    await axios.delete(`${urlCuentas}/${nombre}`)
}