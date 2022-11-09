import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasPostGetModel } from "../../Models/ventas.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/ventas.services";
import FormularioVentas from "./FormularioVentas";

export default function CargarVentas(props: cargarVentaProps) {

    const history = useHistory();
    const { id }: any = useParams()
    const [errores, setErrores] = useState<string[]>([]);
    const [modelo, setModelo] = useState<ventasCrear>()
    const [productos, setProductos] = useState<productoModel[]>([])

    useEffect(() => {
        const res = services.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            console.log(respuesta.data.productos)
            setProductos(respuesta.data.productos);
        })
    }, [])

    async function convertir(objeto: ventasCrear) {
        console.log(objeto)
        var arraygeneral = []
        for (let i = 0; i < objeto.productosIds.length; i++) {
            arraygeneral[i] = [objeto.productosIds[i], objeto.cantidad[i]]
        }
        var fDePago = ''
        if (objeto.efectivo) {
            fDePago = "Efectivo"
        }
        if (objeto.ctaCorriente) {
            fDePago = "Cuenta Corriente"
        }
        if (objeto.transferencia) {
            fDePago = "Transferencia"
        }
        var venta: nuevoVentasModel = {
            clienteId: id,
            productosIds: arraygeneral,
            formaDePago: fDePago
        }
        crear(venta)
    }

    async function crear(venta: nuevoVentasModel) {
        try {
            services.crear(venta)
            history.push('/listadoVentas')
            history.go(0)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    useEffect(()=>{
        if(props.modelo){
            setModelo(props.modelo)
        }else{
            const model={ clienteId: id, cantidad: [], productosIds: [], efectivo: false, transferencia: false, ctaCorriente: false }
            setModelo(model)
        }
    },[])


    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Cargar Venta</h3>
            <MostrarErrores errores={errores} />
            <FormularioVentas productosDisp={productos}
                modelo = {modelo!}
                onSubmit={async valores => convertir(valores)}
            />
        </>
    )
}

interface cargarVentaProps{
    modelo?: ventasCrear
}