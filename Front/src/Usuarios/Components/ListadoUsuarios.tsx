import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { usuariosModel } from "../../Models/usuarios.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/usuarios.services";


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

    async function editar(nombre: string){

    }

    useEffect(() => {
        const res = services.getUsuarios()
        res.then((respuesta: AxiosResponse<usuariosModel[]>) => {
            setUsuarios(respuesta.data)
        })

    }, [])

    const botones = (nombre: string) =>
        <>
            <Button
                style={{ marginRight: '1rem' }}
                onClick={() => confirmar(() => editar(nombre))}
                className="btn btn-transparent">
                <EditIcon />
            </Button>
            <Button
                onClick={() => confirmar(() => borrar(nombre))}
                className="btn btn-transparent">
                <TrashIcon />
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
                                    {botones(usuario.userName)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Verificar>
    )
}
