import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { clienteCrear } from "../../Models/clientes.model";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/clientes.services";
import FormularioClientes from "./FormularioClientes";



export default function EditarCliente() {

    const [cliente, setCliente] = useState<clienteCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const { id }: any = useParams()
    const history = useHistory()

    useEffect(() => {
        const res = services.getCliente(id)
            res.then((respuesta: AxiosResponse<clienteCrear>) => {
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
            services.editar(clienteEditar,id)
            history.push('/listadoClientes')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Editar Cliente</h3>
            <MostrarErrores errores={errores} />
            {cliente ? <FormularioClientes
                modelo={cliente} onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
        </>
    )
}
