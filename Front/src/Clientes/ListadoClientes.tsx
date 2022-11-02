import axios from "axios";
import { Link } from "react-router-dom";
import Verificar from "../Generales/verificador";
import { productoModel } from "../Models/producto.model";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import { urlClientes, urlProductos } from "../Generales/endpoints";
import { clienteModel } from "../Models/clientes.model";


export default function ListadoClientes(props: propsListadoClientes) {

    async function borrar(id: number) {
        try {
            await axios.delete(`${urlClientes}/${id}`)
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
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Nombre y Apellido</th>
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