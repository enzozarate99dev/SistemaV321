import { Link, useHistory } from "react-router-dom";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/clientes.services";


export default function ListadoClientes(props: propsListadoClientes) {

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

    const botones = (urlEditar: string, id: number, urlInfo: string) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-info" to={urlInfo}>Informacion</Link>
            <Link style={{ marginRight: '1rem' }} className="btn btn-transparent" to={urlEditar}><EditIcon /></Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>

    return (
        <Verificar listado={props.clientes}>
            <table className='table'>
                <thead className="table-dark">
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Nombre y Apellido</th>
                        <th>Deuda Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.clientes?.map((cliente) => (
                        <tr key={cliente.id}>
                            <td></td>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombreYApellido}</td>
                            <td>{cliente.deuda}</td>
                            <td>
                                {botones(`clientes/editar/${cliente.id}`, cliente.id, `clientes/${cliente.id}`)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Verificar>
    )
}

interface propsListadoClientes {
    clientes?: clienteModel[];
}