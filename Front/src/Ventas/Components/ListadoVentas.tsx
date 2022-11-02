import { Link, useHistory } from "react-router-dom";
import Verificar from "../../Generales/verificador";
import { ventasModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
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