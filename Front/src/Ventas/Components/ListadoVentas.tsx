import { Link, useHistory } from "react-router-dom";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as servicesCF from "../../VentasConsFinal/Services/consumidorFinal.services";
import * as services from "../Services/ventas.services";
import * as serClientes from "../../Clientes/Services/clientes.services"
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";


export default function ListadoVentas(props: propsListadoVentas) {

    const history = useHistory()
    const [clientes, setClientes] = useState<clienteModel[]>([])

    useEffect(() => {
        const res = serClientes.getTodosLosClientes()
        res.then((resp: AxiosResponse<clienteModel[]>) => {
            setClientes(resp.data)
        })
    }, [])
    
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

    const botones = (urlEditar: string, urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-info" to={urlDetalle}>Detalle</Link>
            <Link style={{ marginRight: '1rem' }} className="btn btn-transparent" to={urlEditar}><EditIcon /></Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>

    const botonesCF = (urlEditar: string, urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-info" to={urlDetalle}>Detalle</Link>
            <Link style={{ marginRight: '1rem' }} className="btn btn-transparent" to={urlEditar}><EditIcon /></Link>
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
                                <td>{clientes[venta.clienteId - 1].nombreYApellido!}</td>
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
                                    {botonesCF(`ventas/editar/${ventacf.id}`, `ventasConsumidorFinal/${ventacf.id}`, ventacf.id)}
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
}