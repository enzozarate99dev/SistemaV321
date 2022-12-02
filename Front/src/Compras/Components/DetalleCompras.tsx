import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { comprasModel } from "../../Models/compras.model";
import * as services from "../Services/compras.services";

export default function DetalleCompras(props: infoCompraProps) {
    const [compra, setCompra] = useState<comprasModel>()

    useEffect(() => {
        const res = services.getCompra(props.id)
            res.then((respuesta: AxiosResponse<comprasModel>) => {
                respuesta.data.fechaDeCompra = new Date(respuesta.data.fechaDeCompra)
                setCompra(respuesta.data)
            })
    }, [props.id])

    return (
        <div className='container'>
            <h4 style={{marginTop:'1rem'}}>Detalle de compra {props.id}</h4>
            <table className='table'>
                <thead>
                    <tr className='table-warning'>
                        <th>Nombre del producto</th>
                        <th>Precio por unidad</th>
                        <th>Cantidad comprada</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {compra?.productos.map((producto) => (
                        <tr className='table-secondary' key={compra?.id}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio.toFixed(2)}</td>
                            <td>{producto.cantidad}</td>
                            <td>{(producto.cantidad * producto.precio).toFixed(2)}</td>
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
                        <td className='table-secondary'>{compra?.precioTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

interface infoCompraProps{
    id: number
    setFlagModal: () => void
    setFlagListado: () => void
}