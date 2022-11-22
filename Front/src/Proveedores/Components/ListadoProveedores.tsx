import { Link, useHistory } from "react-router-dom";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { proveedoresModel } from "../../Models/proveedores.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/proveedores.services";


export default function ListadoProveedores(props: propsListadoClientes) {

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
        <Verificar listado={props.proveedores}>
            <table className='table'>
                <thead className="table-dark">
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Nombre y Apellido</th>
                        <th>Correo Electronico</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.proveedores?.map((proveedor) => (
                        <tr key={proveedor.id}>
                            <td></td>
                            <td>{proveedor.id}</td>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.email}</td>
                            <td>
                                {botones(`proveedores/editar/${proveedor.id}`, proveedor.id, `proveedores/${proveedor.id}`)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Verificar>
    )
}

interface propsListadoClientes {
    proveedores?: proveedoresModel[];
}