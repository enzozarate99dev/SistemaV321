import { Link, useHistory } from "react-router-dom";
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
            <Link style={{  marginRight: '1rem' }} className="btn btn-light" to={urlInfo}>Informacion</Link>
            <Link style={{  marginRight: '1rem' }} className="btn btn-success" to={urlEditar}>Editar</Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-danger">
                Borrar
            </Button>
        </>

    return (
        <Verificar listado={props.clientes}>
            <div className='container'>
                <table className='table'>
                    <thead className="table-dark">
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Nombre y Apellido</th>
                            <th>Deuda Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.clientes?.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>
                                    {botones(`clientes/editar/${cliente.id}`, cliente.id, `clientes/${cliente.id}`)}
                                </td>
                                <td>{cliente.id}</td>
                                <td>{cliente.nombreYApellido}</td>
                                <td>{cliente.deuda}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>           
        </Verificar>
    )
}

interface propsListadoClientes {
    clientes?: clienteModel[];
}