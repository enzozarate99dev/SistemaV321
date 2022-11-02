import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlClientes, urlProductos } from "../Generales/endpoints";
import { clienteCrear } from "../Models/clientes.model";
import { productoCrear } from "../Models/producto.model";
import Cargando from "../utils/Cargando";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioClientes from "./FormularioClientes";



export default function EditarCliente() {

    const [cliente, setCliente] = useState<clienteCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const { id }: any = useParams()
    const history = useHistory()

    useEffect(() => {
        axios.get(`${urlClientes}/${id}`)
            .then((respuesta: AxiosResponse<clienteCrear>) => {
                const modelo: clienteCrear = {
                    nombreYApellido: respuesta.data.nombreYApellido,
                    domicilio: respuesta.data.domicilio,
                    telefono: respuesta.data.telefono,
                    email: respuesta.data.email
                }
                setCliente(modelo)
            })
    }, [id])

    async function editar(clienteEditar: clienteCrear) {
        try {
            await axios.put(`${urlClientes}/${id}`, clienteEditar)
            history.push('/listadoClientes')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Editar Cliente</h3>
            <MostrarErrores errores={errores} />
            {cliente ? <FormularioClientes
                modelo={cliente} onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
        </>
    )
}
