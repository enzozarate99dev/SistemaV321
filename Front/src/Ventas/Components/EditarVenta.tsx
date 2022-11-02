import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasModel, ventasPostGetModel } from "../../Models/ventas.model";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/ventas.services";
import EditorVentas from "./EditorVentas";



export default function EditarVenta() {

    const [venta, setVenta] = useState<ventasCrear>();
    const [errores, setErrores] = useState<string[]>([])
    const { id }: any = useParams()
    const history = useHistory()
    const [productos, setProductos] = useState<productoModel[]>([])

    useEffect(() => {
        const res = services.getProductos()
            res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
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
        const res = services.getVenta(id)
            res.then((respuesta: AxiosResponse<ventasModel>) => {
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
        try {
            services.editar(ventaEditar,id)
            history.push('/listadoVentas')
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Editar Venta</h3>
            <MostrarErrores errores={errores} />
            {venta ? <EditorVentas
                modelo={venta} onSubmit={async valores => await convertir(valores)} productosDisp={productos}
            /> : <Cargando />}
        </>
    )
}
