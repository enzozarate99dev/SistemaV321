import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { clienteModel } from "../../Models/clientes.model";
import { ventasModel } from "../../Models/ventas.model";
import * as services from '../Services/clientes.services';
import * as ventasServices from "../../Ventas/Services/ventas.services"

export default function InfoCliente() {
    const { id }: any = useParams();
    const [cliente, setCliente] = useState<clienteModel>()
    const [ventasCliente, setVentasCliente] = useState<ventasModel[]>([])
    const [clickeado, setClickeado] = useState(false)
    const [checkbox, setCheckbox] = useState(false)

    useEffect(() => {
        const res = services.getCliente(id)
        res.then((respuesta: AxiosResponse<clienteModel>) => {
            setCliente(respuesta.data)
        })
    }, [id])

    useEffect(()=>{
        const res = ventasServices.ventasCliente(id)
        res.then((respuesta: AxiosResponse<ventasModel[]>)=>{
            setVentasCliente(respuesta.data)
        })
    },[id])

    function handleCheckbox(){
        setCheckbox(!checkbox)
    }

    function handleClick() {
        setClickeado(!clickeado)
    }

    return (
        <div className='container'>
            <h3>Detalle de cliente {id}</h3>
            <br></br>
            <h2>{cliente?.nombreYApellido}</h2>
            <h4>{cliente?.email}</h4>
            <br></br>
            <h4>Domicilio: {cliente?.domicilio}</h4>
            <h4>Telefono: {cliente?.telefono}</h4>
            <h4>Deuda: {cliente?.deuda}</h4>
            <br></br>
            <h4 className="btn btn-secondary" onClick={handleClick}>Compras hechas por el cliente</h4>
            {clickeado ?
                <div className="container">
                    <label htmlFor="cta">No pagados</label>
                    <input style={{marginLeft:'0.5rem'}} type='checkbox' name="cta" onClick={handleCheckbox}></input> 
                    <br></br>
                    {!checkbox ? (ventasCliente.map((venta,index) => <><Link to={`/ventas/detalle/${venta.id}`}>Venta {index+1}</Link><br></br></>)):(ventasCliente.map((venta,index) => <>{
                        (venta.adeudada > 0 ? <><Link to={`/ventas/detalle/${venta.id}`}>Venta {index+1}</Link><Link style={{marginLeft:'0.5rem'}} to={`/ventas/cancelar/${venta.id}`}>Cancelar esta deuda</Link><br></br></>:null)
                    }</>))}
                </div> :
                null}
        </div>
    )
}


