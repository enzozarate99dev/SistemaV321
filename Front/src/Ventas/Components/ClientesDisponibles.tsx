import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import { ventasPostGetModel } from "../../Models/ventas.model";
import * as services from "../../Clientes/Services/clientes.services";


export default function ClientesDisponibles() {

    const [clientes, setClientes] = useState<clienteModel[]>([])

    useEffect(() => {
        const res = services.getTodosLosClientes()
            res.then((respuesta: AxiosResponse<clienteModel[]>) => {
                setClientes(respuesta.data);
            })
    }, [])

    return (
        <Verificar listado={clientes}>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nombre y Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nombreYApellido}</td>
                                <td>
                                    <Link style={{  marginRight: '1rem' }} className="btn btn-info" to={`ventas/${cliente.id}`}>Registrar venta para este cliente</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>           
        </Verificar>
    )
}
