import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { productoModel } from "../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasModel, ventasPostGetModel } from "../Models/ventas.model";
import Cargando from "../utils/Cargando";
import { urlVentas } from "../Generales/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import EditorVentas from "./EditorVentas";
import FormularioVentas from "./FormularioVentas";



export default function EditarVenta() {

    const [venta, setVenta] = useState<ventasCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const { id }: any = useParams()
    const history = useHistory()
    const [productos, setProductos] = useState<productoModel[]>([])

    useEffect(() => {
        axios.get(`${urlVentas}/postget`)
            .then((respuesta: AxiosResponse<ventasPostGetModel>) => {
                setProductos(respuesta.data.productos);
            })
    }, [])

    function crearArreglo1(data: ventasModel): number[]{
        var array: number[] = []
        data.productos.map((producto,index)=> array[index]=producto.id)
        return array
    }

    function crearArreglo2(data: ventasModel): number[]{
        var array: number[] = []
        data.productos.map((producto,index)=> array[index]=producto.cantidad)
        return array
    }

    useEffect(() => {
        axios.get(`${urlVentas}/${id}`)
            .then((respuesta: AxiosResponse<ventasModel>) => {
                var arre1: number[] = crearArreglo1(respuesta.data)
                var arre2: number[] = crearArreglo2(respuesta.data)
                const modelo: ventasCrear = {
                    nombreCliente: respuesta.data.nombreCliente,
                    productosIds: arre1,
                    cantidad: arre2
                }
                setVenta(modelo)
            })
    }, [id])

    function convertir(ventaEditar: ventasCrear){
        var arraygeneral: number[][] = []
        for (let i = 0; i < ventaEditar.productosIds.length; i++) {
            arraygeneral[i] = [ventaEditar.productosIds[i], ventaEditar.cantidad[i]]
        }
        var venta: nuevoVentasModel = {
            nombreCliente: ventaEditar.nombreCliente,
            productosIds: arraygeneral
        }
        editar(venta)
    }

    async function editar(ventaEditar: nuevoVentasModel) {
        console.log(ventaEditar)
        try {
            await axios.put(`${urlVentas}/${id}`, ventaEditar)
            history.push('/listadoVentas')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Editar Venta</h3>
            <MostrarErrores errores={errores} />
            {venta ? <EditorVentas
                modelo={venta} onSubmit={async valores => await convertir(valores)} productosDisp={productos}
            /> : <Cargando />}
        </>
    )
}
