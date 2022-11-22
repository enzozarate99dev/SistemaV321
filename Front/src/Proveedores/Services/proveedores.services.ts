import axios from "axios";
import { urlProveedores } from "../../Generales/endpoints";
import { proveedoresCrear } from "../../Models/proveedores.model";
import { filtroProveedoresProps } from "../Components/FiltroProveedores";

export async function crear(valores: proveedoresCrear){
    await axios.post(`${urlProveedores}`, valores)
}

export async function filtrar(valores: filtroProveedoresProps){
    const response = axios.get(`${urlProveedores}/filtrar`, { params: valores })
    return response
}

export async function borrar(id:number){
    await axios.delete(`${urlProveedores}/${id}`)
}

export async function getProveedor(id:any){
    const res = axios.get(`${urlProveedores}/${id}`)
    return res
}

export async function editar(proveedorEditar: proveedoresCrear, id:any){
    await axios.put(`${urlProveedores}/${id}`, proveedorEditar)
}