import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { productoCrear } from "../Models/producto.model";
import Cargando from "../utils/Cargando";
import { urlProductos } from "../Generales/endpoints";
import { convertirProductoAFormData } from "../utils/FormData";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioProductos from "./FormularioProductos";



export default function EditarProducto() {

    const [producto, setProducto] = useState<productoCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const { id }: any = useParams()
    const history = useHistory()

    useEffect(() => {
        axios.get(`${urlProductos}/${id}`)
            .then((respuesta: AxiosResponse<productoCrear>) => {
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
    }, [id])

    async function editar(productoEditar: productoCrear) {
        try {
            await axios.put(`${urlProductos}/${id}`, productoEditar)
            history.push('/')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Editar Producto</h3>
            <MostrarErrores errores={errores} />
            {producto ? <FormularioProductos
                modelo={producto} onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}
        </>
    )
}
