import { Link, useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";
import Verificar from "../../Generales/verificador";
import { ventasModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/ventas.services";
import { clienteModel } from "../../Models/clientes.model";
import { useEffect, useState } from "react";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";


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

    function formatDate(fecha: string): string {
        var array = fecha.split("T")
        return array[0]
    }

    const botones = (urlEditar: string, urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-light" to={urlDetalle}>Detalle</Link>
            <Link style={{ marginRight: '1rem' }} className="btn btn-success" to={urlEditar}>Editar</Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-danger">
                Borrar
            </Button>
        </>

        

    
    return (
        <Verificar listado={props.ventas}>
            <div className='container'>
                <table className='table'>
                    <thead>
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
                                <td>{props.clientes![venta.clienteId - 1].nombreYApellido!}</td>
                                <td>{venta.precioTotal}</td>
                                <td>{venta.formaDePago}</td>
                                <td>{formatDate(venta.fechaDeVenta.toString())}</td>
                                <td>
                                    {botones(`ventas/editar/${venta.id}`, `ventas/detalle/${venta.id}`, venta.id)}
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
                                    {botones(`ventas/editar/${ventacf.id}`, `ventas/detalle/${ventacf.id}`, ventacf.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Verificar>
    )
}

interface propsListadoVentas {
    ventas?: ventasModel[];
    ventasConsFinal?: ventasConsumidorFinalModel[];
    clientes?: clienteModel[]
}