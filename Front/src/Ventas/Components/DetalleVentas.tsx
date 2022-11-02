import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ventasModel } from "../../Models/ventas.model";
import * as services from "../Services/ventas.services";

export default function DetalleVentas() {
    const { id }: any = useParams();
    const [venta, setVenta] = useState<ventasModel>()

    useEffect(() => {
        const res = services.getVenta(id)
            res.then((respuesta: AxiosResponse<ventasModel>) => {
                respuesta.data.fechaDeVenta = new Date(respuesta.data.fechaDeVenta)
                setVenta(respuesta.data)
                console.log(venta)
            })
    }, [id])

    function cuenta(cantidad: number, precio: number): number {
        var total: number = cantidad * precio
        return total
    }

    return (
        <div className='container'>
            <h4>Detalle de venta {id}</h4>
            <h5>Cliente: {venta?.nombreCliente}</h5>
            <table className='table'>
                <thead>
                    <tr className='table-warning'>
                        <th>Nombre del producto</th>
                        <th>Precio por unidad</th>
                        <th>Cantidad vendida</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {venta?.productos.map((producto) => (
                        <tr className='table-secondary' key={venta?.id}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.cantidad}</td>
                            <td>{cuenta(producto.cantidad, producto.precio)}</td>
                        </tr>
                    ))}
                </tbody>
                <br></br>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className='table-warning'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='table-secondary'>{venta?.precioTotal}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}