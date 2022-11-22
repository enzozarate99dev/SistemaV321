import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { proveedoresCrear, proveedoresModel } from "../../Models/proveedores.model";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/proveedores.services";
import FormularioProveedores from "./FormularioProveedores";



export default function EditarProveedor() {

    const [proveedor, setProveedor] = useState<proveedoresCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const { id }: any = useParams()
    const history = useHistory()

    useEffect(() => {
        const res = services.getProveedor(id)
            res.then((respuesta: AxiosResponse<proveedoresModel>) => {
                const modelo: proveedoresCrear = {
                    nombre: respuesta.data.nombre,
                    direccion: respuesta.data.direccion,
                    telefono: respuesta.data.telefono,
                    email: respuesta.data.email
                }
                setProveedor(modelo)
            })
    }, [id])

    async function editar(clienteEditar: proveedoresCrear) {
        try {
            services.editar(clienteEditar,id)
            history.push('/listadoProveedores')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Editar Cliente</h3>
            <MostrarErrores errores={errores} />
            {proveedor ? <FormularioProveedores
                modelo={proveedor} onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
        </>
    )
}
