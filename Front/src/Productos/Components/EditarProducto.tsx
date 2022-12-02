import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { productoCrear } from "../../Models/producto.model";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/productos.services";
import FormularioProductos from "./FormularioProductos";

export default function EditarProducto(props: editarProductoProps) {

    const [errores, setErrores] = useState<string[]>([])
    const history = useHistory();
    const [producto, setProducto] = useState<productoCrear>();

    async function editar(productoEditar: productoCrear) {
        try {
            services.editar(productoEditar,props.id)
            props.setFlagModal()
            props.setFlagListado()
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    useEffect(() => {
        const response = services.getProductos(props.id)
        response.then((respuesta: AxiosResponse<productoCrear>) => {
            const modelo: productoCrear = {
                nombre: respuesta.data.nombre,
                precio: respuesta.data.precio,
                codigo: respuesta.data.codigo,
                descripcion: respuesta.data.descripcion,
                categoria: respuesta.data.categoria,
                cantidad: respuesta.data.cantidad
            }
            setProducto(modelo)
        })
    }, [props.id])

    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Editar Producto</h3>
            <MostrarErrores errores={errores} />
            {producto ? <FormularioProductos
                modelo={producto} onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
        </>
    )
}

interface editarProductoProps{
    id: number
    setFlagModal: () => void
    setFlagListado: () => void
}
