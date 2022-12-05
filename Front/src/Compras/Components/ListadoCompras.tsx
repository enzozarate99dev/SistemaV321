import { Modal } from "antd";
import { useState } from "react";
import AddIcon from "../../assets/AddIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { comprasModel } from "../../Models/compras.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/compras.services";
import Compras from "./Compras";
import DetalleCompras from "./DetalleCompras";


export default function ListadoCompras(props: propListadoCompras) {

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState(false);
    const [id, setId] = useState<number>()

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

    function formatDate(fecha: string): string {
        var array = fecha.split("T")
        return array[0]
    }

    const botones = (id: number) =>
        <>
            <Button style={{ marginRight: '1rem' }} className="btn btn-info" onClick={() => {
                showInfo()
                setId(id)
            }}>
                Detalle
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
                title="Cargar Compra"
                width={1150}
                open={open}
                footer={null}
                centered
                onCancel={showModal}
            >
                <p>
                    <Compras setFlagModal={showModal} setFlagListado={props.setFlag} />
                </p>
            </Modal>
            <Modal
                title="Detalle Compra"
                width={1150}
                open={info}
                footer={null}
                centered
                onCancel={showInfo}
            >
                <p>
                    <DetalleCompras id={id!} setFlagModal={showInfo} setFlagListado={props.setFlag} />
                </p>
            </Modal>
            <Verificar listado={props.compras!}>
                <>
                    <table className='table'>
                        <thead className="table-dark">
                            <tr>
                                <th>Id de proveedor</th>
                                <th>Total</th>
                                <th>Fecha</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.compras?.map((compra) => (
                                <tr key={compra.id}>
                                    <td>{compra.proveedorId}</td>
                                    <td>{compra.precioTotal}</td>
                                    <td>{formatDate(compra.fechaDeCompra.toString())}</td>
                                    <td>
                                        {botones(compra.id)}
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

interface propListadoCompras {
    compras?: comprasModel[];
    setFlag: () => void;
}