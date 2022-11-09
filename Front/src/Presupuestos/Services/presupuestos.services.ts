import axios from "axios";
import { urlPresupuestos } from "../../Generales/endpoints";
import { presupuestoCrear } from "../../Models/presupuestos.model";
import { filtroPresupuestosProps } from "../Components/FiltroPresupuestos";

export async function crear(valores: presupuestoCrear){
    await axios.post(`${urlPresupuestos}`, valores)
}

export async function borrar(id: number){
    await axios.delete(`${urlPresupuestos}/${id}`)
}

export async function filtrar(valores:filtroPresupuestosProps) {
    const res = axios.get(`${urlPresupuestos}/filtrar`, { params: valores })
    return res
}