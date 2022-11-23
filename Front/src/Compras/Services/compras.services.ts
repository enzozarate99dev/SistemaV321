import axios from "axios";
import { urlCompras } from "../../Generales/endpoints";
import { comprasCrear } from "../../Models/compras.model";
import { filtroComprasProps } from "../Components/FiltroCompras";


export async function crear(valores: comprasCrear){
    await axios.post(`${urlCompras}`, valores)
}

export async function filtrar(valores: filtroComprasProps){
    const res = axios.get(`${urlCompras}/filtrar`, { params: valores })
    return res
}

export async function borrar(id: number){
    await axios.delete(`${urlCompras}/${id}`)
}

export async function getCompra(id:any) {
    const res = axios.get(`${urlCompras}/${id}`)
    return res
}