import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { productoModel } from "../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasPostGetModel } from "../Models/ventas.model";
import { urlProductos, urlVentas } from "../Generales/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioVentas from "./FormularioVentas";

export default function CargarVentas() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);
    const [productos, setProductos] = useState<productoModel[]>([])

    useEffect(() => {
        axios.get(`${urlVentas}/postget`)
            .then((respuesta: AxiosResponse<ventasPostGetModel>) => {
                console.log(respuesta.data.productos)
                setProductos(respuesta.data.productos);
            })
    }, [])

    async function convertir(objeto: ventasCrear) {
        var arraygeneral = []
        for (let i = 0; i < objeto.productosIds.length; i++) {
            arraygeneral[i] = [objeto.productosIds[i], objeto.cantidad[i]]
        }
        var venta: nuevoVentasModel = {
            nombreCliente: objeto.nombreCliente,
            productosIds: arraygeneral
        }
        crear(venta)
    }

    async function crear(venta: nuevoVentasModel) {
        console.log(venta)
        try {
            await axios.post(`${urlVentas}`, venta)
            history.push(`${urlProductos}`)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }


    return (
        <>
            <h3>Cargar Venta</h3>
            <MostrarErrores errores={errores} />
            <FormularioVentas productosDisp={productos}
                modelo={{ nombreCliente: '', cantidad: [], productosIds: [] }}
                onSubmit={async valores => convertir(valores)}
            />
        </>
    )
}