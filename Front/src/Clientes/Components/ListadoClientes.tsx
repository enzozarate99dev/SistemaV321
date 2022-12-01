import { Modal } from "antd";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/clientes.services";
import CargarCliente from "./CargarCliente";
import EditarCliente from "./EditarCliente";
import InfoCliente from "./InfoCliente";


export default function ListadoClientes(props: propsListadoClientes) {

    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [info, setInfo] = useState(false);
    const [id, setId] = useState<number>()

    const showEdit = () => {
        setEdit(!edit);
    };

    const showModal = () => {
        setOpen(!open);
        props.setFlag()
    };

    const showInfo = () => {
        setInfo(!info);
    };

    async function borrar(id: number) {
        try {
            services.borrar(id)
            props.setFlag()
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    const botones = (id: number) =>
        <>
            <Button style={{ marginRight: '1rem' }} className="btn btn-info" onClick={() => {
                showInfo()
                setId(id)
            }}>
                Informacion
            </Button>
            <Button style={{ marginRight: '1rem' }} className="btn btn-transparent" onClick={() => {
                showEdit()
                setId(id)
            }}>
                <EditIcon />
            </Button>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>

    return (
        <Verificar listado={props.clientes}>
            <>
                <Button style={{ marginBottom: '1rem', marginLeft: '65.75rem', marginTop: '-85px' }} onClick={() => { showModal() }} className="btn btn-transparent"><AddIcon /></Button>
                <Modal
                    title="Cargar Cliente"
                    width={1150}
                    open={open}
                    footer={null}
                    centered
                    onCancel={showModal}
                >
                    <p><CargarCliente setFlagModal={showModal} setFlagListado={props.setFlag} /></p>
                </Modal>
                <Modal
                    title="Editar Cliente"
                    width={1150}
                    open={edit}
                    footer={null}
                    centered
                    onCancel={showEdit}
                >
                    <p><EditarCliente id={id!} setFlagModal={showEdit} setFlagListado={props.setFlag} /></p>
                </Modal>
                <Modal
                    title="Informacion del cliente"
                    width={1150}
                    open={info}
                    footer={null}
                    centered
                    onCancel={showInfo}
                >
                    <p><InfoCliente id={id!} setFlagModal={showInfo} setFlagListado={props.setFlag} /></p>
                </Modal>
                <table style={{ marginTop: '-15px' }} className='table'>
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
                                    {botones(cliente.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </Verificar>
    )
}

interface propsListadoClientes {
    clientes?: clienteModel[];
    setFlag: () => void;
}