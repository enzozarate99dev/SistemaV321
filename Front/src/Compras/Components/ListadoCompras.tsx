import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import { comprasModel } from "../../Models/compras.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/compras.services"


export default function ListadoCompras(props: propListadoCompras) {

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

    const botones = (urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-info" to={urlDetalle}>Detalle</Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>


    return (
        <>
            <Verificar listado={props.compras!}>
                <table className='table'>
                    <thead className="table-dark">
                        <tr>
                            <th>Id de proveedor</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.compras?.map((compra) => (
                            <tr key={compra.id}>
                                <td>{compra.proveedorId}</td>
                                <td>{compra.precioTotal}</td>
                                <td>{formatDate(compra.fechaDeCompra.toString())}</td>
                                <td>
                                    {botones(`compras/detalle/${compra.id}`, compra.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Verificar>
        </>
    )
}

interface propListadoCompras {
    compras?: comprasModel[];
}