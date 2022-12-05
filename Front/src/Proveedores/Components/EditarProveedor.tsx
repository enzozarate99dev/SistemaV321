import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { proveedoresCrear, proveedoresModel } from "../../Models/proveedores.model";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/proveedores.services";
import FormularioProveedores from "./FormularioProveedores";



export default function EditarProveedor(props: editarProvedorProps) {

    const [proveedor, setProveedor] = useState<proveedoresCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const history = useHistory()

    useEffect(() => {
        const res = services.getProveedor(props.id)
            res.then((respuesta: AxiosResponse<proveedoresModel>) => {
                const modelo: proveedoresCrear = {
                    nombre: respuesta.data.nombre,
                    direccion: respuesta.data.direccion,
                    telefono: respuesta.data.telefono,
                    email: respuesta.data.email
                }
                setProveedor(modelo)
            })
    }, [props.id])

    async function editar(clienteEditar: proveedoresCrear) {
        try {
            services.editar(clienteEditar,props.id)
            props.setFlagModal()
            props.setFlagListado()
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <MostrarErrores errores={errores} />
            {proveedor ? <FormularioProveedores
                modelo={proveedor} onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
        </>
    )
}

interface editarProvedorProps{
    id: number
    setFlagModal: () => void
    setFlagListado: () => void
}
