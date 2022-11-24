import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import { proveedoresModel } from "../../Models/proveedores.model";
import * as services from '../Services/proveedores.services';

export default function InfoProveedor() {
    const { id }: any = useParams();
    const [proveedor, setProveedor] = useState<proveedoresModel>()

    useEffect(() => {
        const res = services.getProveedor(id)
        res.then((respuesta: AxiosResponse<proveedoresModel>) => {
            setProveedor(respuesta.data)
        })
    }, [id])


    return (
        <div className='container'>
            <h3>Detalle de cliente {id}</h3>
            <br></br>
            <h2>{proveedor?.nombre}</h2>
            <h4>{proveedor?.email}</h4>
            <br></br>
            <h4>Domicilio: {proveedor?.direccion}</h4>
            <h4>Telefono: {proveedor?.telefono}</h4>
            <br></br>
            <h4>Compras:</h4>
            <Verificar listado={proveedor?.compras}>
                <table className='table'>
                    <thead className="table-dark">
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Precio Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedor?.compras.map((compra) => (
                            <tr key={compra.id}>
                                <td></td>
                                <td>{compra.id}</td>
                                <td>{compra.precioTotal}</td>
                                <td>
                                    {<Link className="btn btn-info" to={`/compras/detalle/${compra.id}`}>Ir a compra</Link>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Verificar>
        </div>
    )
}


