import { Modal } from "antd";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { proveedoresModel } from "../../Models/proveedores.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/proveedores.services";
import CargarProveedor from "./CargarProveedor";
import EditarProveedor from "./EditarProveedor";
import InfoProveedor from "./InfoProveedor";


export default function ListadoProveedores(props: propsListadoClientes) {

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
        <>
            <Button style={{ marginBottom: '1rem', marginLeft: '65.75rem', marginTop: '-85px' }} onClick={() => { showModal() }} className="btn btn-transparent"><AddIcon /></Button>
            <Modal
                title="Cargar Proveedor"
                width={1150}
                open={open}
                footer={null}
                centered
                onCancel={showModal}
            >
                <p><CargarProveedor setFlagModal={showModal} setFlagListado={props.setFlag} /></p>
            </Modal>
            <Modal
                title="Editar Proveedor"
                width={1150}
                open={edit}
                footer={null}
                centered
                onCancel={showEdit}
            >
                <p><EditarProveedor id={id!} setFlagModal={showEdit} setFlagListado={props.setFlag} /></p>
            </Modal>
            <Modal
                title="Informacion del proveedor"
                width={1150}
                open={info}
                footer={null}
                centered
                onCancel={showInfo}
            >
                <p><InfoProveedor id={id!} setFlagModal={showInfo} setFlagListado={props.setFlag} /></p>
            </Modal>
            <Verificar listado={props.proveedores}>
                <>
                    <table className='table' style={{ marginTop: '-15px' }}>
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
                                        {botones(proveedor.id)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            </Verificar>
        </>
    )
}

interface propsListadoClientes {
    proveedores?: proveedoresModel[];
    setFlag: () => void;
}