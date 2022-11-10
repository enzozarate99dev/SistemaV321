import { Link, useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";
import Verificar from "../../Generales/verificador";
import { ventasModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import { clienteModel } from "../../Models/clientes.model";
import { useEffect, useState } from "react";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import * as services from "../Services/usuarios.services"
import { usuariosModel } from "../../Models/usuarios.model";


export default function ListadoUsuarios() {

    const history = useHistory()
    const [usuarios, setUsuarios] = useState<usuariosModel[]>([])


    async function borrar(nombre: string) {
        try {
            services.borrar(nombre)
            history.go(0)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const res = services.getUsuarios()
        res.then((respuesta: AxiosResponse<usuariosModel[]>) => {
            setUsuarios(respuesta.data)
        })

    }, [])

    const botones = (urlEditar: string, urlDetalle: string, nombre: string) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-light" to={urlDetalle}>Detalle</Link>
            <Link style={{ marginRight: '1rem' }} className="btn btn-success" to={urlEditar}>Editar</Link>
            <Button
                onClick={() => confirmar(() => borrar(nombre))}
                className="btn btn-danger">
                Borrar
            </Button>
        </>




    return (
        <Verificar listado={usuarios}>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.userName}>
                                <td>{usuario.userName}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.role}</td>
                                <td>
                                    {botones(`ventas/editar/${usuario.userName}`, `ventas/detalle/${usuario.userName}`, usuario.userName)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Verificar>
    )
}
