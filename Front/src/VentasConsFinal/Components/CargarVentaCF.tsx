import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import { ventasPostGetModel } from "../../Models/ventas.model";
import { nuevoVentasCFModel, ventasConsumidorFinalCrear } from "../../Models/ventasCf.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as servicesVentas from "../../Ventas/Services/ventas.services";
import * as services from "../Services/consumidorFinal.services"
import FormularioConsumidorFinal from "./FormularioConsumidorFinal";

export default function CargarVentaCF() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);
    const [productos, setProductos] = useState<productoModel[]>([])

    useEffect(() => {
        const res = servicesVentas.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            console.log(respuesta.data.productos)
            setProductos(respuesta.data.productos);
        })
    }, [])

    async function convertir(objeto: ventasConsumidorFinalCrear) {
        console.log(objeto)
        var arraygeneral = []
        for (let i = 0; i < objeto.productosIds.length; i++) {
            arraygeneral[i] = [objeto.productosIds[i], objeto.cantidad[i]]
        }
        var fDePago = ''
        if (objeto.efectivo) {
            fDePago = "Efectivo"
        }
        if (objeto.transferencia) {
            fDePago = "Transferencia"
        }
        var venta: nuevoVentasCFModel = {
            nombreCliente: objeto.nombreCliente,
            productosIds: arraygeneral,
            formaDePago: fDePago
        }
        crear(venta)
    }

    async function crear(venta: nuevoVentasCFModel) {
        try {
            services.crear(venta)
            history.push('/listadoVentas')
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }


    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Cargar Venta</h3>
            <MostrarErrores errores={errores} />
            <FormularioConsumidorFinal productosDisp={productos}
                modelo={{ nombreCliente: '', cantidad: [], productosIds: [], efectivo: false, transferencia: false}}
                onSubmit={async valores => convertir(valores)}
            />
        </>
    )
}