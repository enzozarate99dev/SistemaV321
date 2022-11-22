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

export async function getPresupuesto(id: any){
    const res = axios.get(`${urlPresupuestos}/${id}`)
    return res
}

export async function filtrar(valores:filtroPresupuestosProps) {
    const res = axios.get(`${urlPresupuestos}/filtrar`, { params: valores })
    return res
}

export async function editar(id: any, valores: presupuestoCrear){
    await axios.put(`${urlPresupuestos}/${id}`, valores)
}