import axios from "axios";
import { urlClientes } from "../../Generales/endpoints";
import { clienteCrear } from "../../Models/clientes.model";
import { filtroClientesProps } from "../Components/FiltroClientes";


export async function crear(cliente: clienteCrear){
    await axios.post(`${urlClientes}`, cliente)
}

export async function editar(clienteEditar: clienteCrear, id:any){
    await axios.put(`${urlClientes}/${id}`, clienteEditar)
}

export async function borrar(id:number){
    await axios.delete(`${urlClientes}/${id}`)
}

export async function filtrar(valores: filtroClientesProps){
    const response = axios.get(`${urlClientes}/filtrar`, { params: valores })
    return response
}

export async function getCliente(id:any){
    const res = axios.get(`${urlClientes}/${id}`)
    return res
}

export async function getTodosLosClientes(){
    const res = axios.get(`${urlClientes}`)
    return res
}

