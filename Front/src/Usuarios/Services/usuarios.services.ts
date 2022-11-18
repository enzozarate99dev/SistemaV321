import axios from "axios"
import { urlCuentas } from "../../Generales/endpoints"
import { usuariosEnviar, usuariosModel } from "../../Models/usuarios.model"

export async function registrar(credenciales: usuariosEnviar){
    await axios.post(`${urlCuentas}/crear`, credenciales)
}

export async function getUsuarios(){
    const res = await axios.get<usuariosModel[]>(`${urlCuentas}`)
    return res
}

export async function borrar(nombre: string){
    await axios.delete(`${urlCuentas}/${nombre}`)
}