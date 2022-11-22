import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as servicesCF from "../../VentasConsFinal/Services/consumidorFinal.services";
import * as services from "../Services/ventas.services";


export default function ListadoVentas(props: propsListadoVentas) {

    const history = useHistory()
    
    async function borrar(id: number) {
        try {
            services.borrar(id)
            history.go(0)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    async function borrarCF(id: number) {
        try {
            servicesCF.borrar(id)
            history.go(0)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    function formatDate(fecha: string): string {
        var array = fecha.split("T")
        return array[0]
    }

    function getNombre(clientes: clienteModel[], clienteId: number):string{
        var newArray = clientes.filter(x=>x.id == clienteId)
        return newArray[0].nombreYApellido
    }

    const botones = (urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-info" to={urlDetalle}>Detalle</Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>

    const botonesCF = (urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-info" to={urlDetalle}>Detalle</Link>
            <Button
                onClick={() => confirmar(() => borrarCF(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>


    return (
        <>
            <Verificar listado={props.ventas}>
                <table className='table'>
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Total</th>
                            <th>Forma De Pago</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ventas?.map((venta) => (
                            <tr key={venta.id}>
                                {props.clientes ? <td>{getNombre(props.clientes,venta.clienteId)}</td> : <td></td>}
                                <td>{venta.precioTotal}</td>
                                <td>{venta.formaDePago}</td>
                                <td>{formatDate(venta.fechaDeVenta.toString())}</td>
                                <td>
                                    {botones(`ventas/detalle/${venta.id}`, venta.id)}
                                </td>
                            </tr>
                        ))}
                        {props.ventasConsFinal?.map((ventacf) => (
                            <tr key={ventacf.id}>
                                <td>{ventacf.nombreCliente}</td>
                                <td>{ventacf.precioTotal}</td>
                                <td>{ventacf.formaDePago}</td>
                                <td>{formatDate(ventacf.fechaDeVenta.toString())}</td>
                                <td>
                                    {botonesCF(`ventasConsumidorFinal/${ventacf.id}`, ventacf.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Verificar>
        </>
    )
}

interface propsListadoVentas {
    ventas?: ventasModel[];
    ventasConsFinal?: ventasConsumidorFinalModel[];
    clientes?: clienteModel[]
}