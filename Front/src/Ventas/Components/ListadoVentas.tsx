import { Modal, Tabs } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import ConsumidorFinal from "../../VentasConsFinal/Components/ConsumidorFinal";
import DetalleVentasCF from "../../VentasConsFinal/Components/DetalleVentasCF";
import * as servicesCF from "../../VentasConsFinal/Services/consumidorFinal.services";
import * as services from "../Services/ventas.services";
import DetalleVentas from "./DetalleVentas";
import Ventas from "./Ventas";


export default function ListadoVentas(props: propsListadoVentas) {

    const history = useHistory()
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [info, setInfo] = useState(false);
    const [infoCF, setInfoCF] = useState(false);
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

    const showInfoCF = () => {
        setInfoCF(!infoCF);
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

    async function borrarCF(id: number) {
        try {
            servicesCF.borrar(id)
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

    function getNombre(clientes: clienteModel[], clienteId: number): string {
        var newArray = clientes.filter(x => x.id == clienteId)
        return newArray[0].nombreYApellido
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

    const botonesCF = (id: number) =>
        <>
            <Button style={{ marginRight: '1rem' }} className="btn btn-info" onClick={() => {
                showInfoCF()
                setId(id)
            }}>
                Detalle
            </Button>
            <Button
                onClick={() => confirmar(() => borrarCF(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>


    return (
        <>
            <Button style={{ marginBottom: '1rem', marginLeft: '65.75rem', marginTop: '-85px' }} onClick={() => { showModal() }} className="btn btn-transparent"><AddIcon /></Button>
            <Modal
                title="Cargar Venta"
                width={1150}
                open={open}
                footer={null}
                centered
                onCancel={showModal}
            >
                <p>
                    <>
                        <Tabs>
                            <Tabs.TabPane tab="Cliente Registrado" key="item-1">
                                <Ventas setFlagModal={showModal} setFlagListado={props.setFlag} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Consumidor Final" key="item-2">
                                <ConsumidorFinal setFlagModal={showModal} setFlagListado={props.setFlag} />
                            </Tabs.TabPane>
                        </Tabs>
                    </>
                </p>
            </Modal>
            <Modal
                title="Informacion del cliente"
                width={1150}
                open={info}
                footer={null}
                centered
                onCancel={showInfo}
            >
                <p><DetalleVentas id={id!} setFlagModal={showInfo} setFlagListado={props.setFlag} /></p>
            </Modal>
            <Modal
                title="Informacion del cliente"
                width={1150}
                open={infoCF}
                footer={null}
                centered
                onCancel={showInfoCF}
            >
                <p><DetalleVentasCF id={id!} setFlagModal={showInfoCF} setFlagListado={props.setFlag} /></p>
            </Modal>
            <table className='table' style={{ marginTop: '-15px' }}>
                <thead className="table-dark">
                    <tr>
                        <th>Nombre y Apellido</th>
                        <th>Total</th>
                        <th>Forma De Pago</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.ventas?.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.cliente.nombreYApellido}</td>
                            <td>{venta.precioTotal}</td>
                            <td>{venta.formaDePago}</td>
                            <td>{formatDate(venta.fechaDeVenta.toString())}</td>
                            <td>
                                {botones(venta.id)}
                            </td>
                        </tr>
                    ))}
                    {props.ventasConsFinal?.map((ventacf) => (
                        <tr key={ventacf.id}>
                            <td>{ventacf.nombreCliente}</td>
                            <td>{ventacf.precioTotal}</td>
                            <td>{ventacf.formaDePago}</td>
                            <td>{formatDate(ventacf.fechaDeVenta.toString())}</td>
                            <td>
                                {botonesCF(ventacf.id)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

interface propsListadoVentas {
    ventas?: ventasModel[];
    ventasConsFinal?: ventasConsumidorFinalModel[];
    setFlag: () => void;
}