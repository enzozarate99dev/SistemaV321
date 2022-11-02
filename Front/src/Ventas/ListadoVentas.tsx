import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Verificar from "../Generales/verificador";
import { listadoVentas, ventasModel } from "../Models/ventas.model";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import { urlVentas } from "../Generales/endpoints";


export default function ListadoVentas(props: propsListadoVentas) {


    async function borrar(id: number) {
        try {
            await axios.delete(`${urlVentas}/${id}`)
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
                            <th>#</th>
                            <th>Nombre y Apellido</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ventas?.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.id}</td>
                                <td>{venta.nombreCliente}</td>
                                <td>{venta.precioTotal}</td>
                                <td>{formatDate(venta.fechaDeVenta.toString())}</td>
                                <td>
                                    {botones(`ventas/editar/${venta.id}`, `ventas/${venta.id}`, venta.id)}
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
}