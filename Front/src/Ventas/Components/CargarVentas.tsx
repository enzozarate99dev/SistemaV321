import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlProductos } from "../../Generales/endpoints";
import { productoModel } from "../../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasPostGetModel } from "../../Models/ventas.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/ventas.services";
import FormularioVentas from "./FormularioVentas";

export default function CargarVentas() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);
    const [productos, setProductos] = useState<productoModel[]>([])

    useEffect(() => {
        const res = services.getProductos()
            res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
                console.log(respuesta.data.productos)
                setProductos(respuesta.data.productos);
            })
    }, [])

    async function convertir(objeto: ventasCrear) {
        var arraygeneral = []
        for (let i = 0; i < objeto.productosIds.length; i++) {
            arraygeneral[i] = [objeto.productosIds[i], objeto.cantidad[i]]
        }
        var fDePago = ''
        if(objeto.efectivo){
            fDePago = "Efectivo"
        }
        if(objeto.ctaCorriente){
            fDePago = "Cuenta Corriente"
        }
        if(objeto.transferencia){
            fDePago = "Transferencia"
        }
        var venta: nuevoVentasModel = {
            nombreCliente: objeto.nombreCliente,
            productosIds: arraygeneral,
            formaDePago: fDePago
        }
        crear(venta)
    }

    async function crear(venta: nuevoVentasModel) {
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
            <h3 style={{marginTop:'1rem'}}>Cargar Venta</h3>
            <MostrarErrores errores={errores} />
            <FormularioVentas productosDisp={productos}
                modelo={{ nombreCliente: '', cantidad: [], productosIds: [], efectivo: false, ctaCorriente: false, transferencia: false }}
                onSubmit={async valores => convertir(valores)}
            />
        </>
    )
}