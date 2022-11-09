import { Link, useHistory } from "react-router-dom";
import Verificar from "../../Generales/verificador";
import { presupuestoModel } from "../../Models/presupuestos.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/presupuestos.services";
import * as XLSX from "xlsx"


export default function ListadoPresupuestos(props: propsListadoPresupuestos) {

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

    function crearModelo(valores: presupuestoModel){
        const model = {
            Id: valores.id,
            Nombre: valores.nombre,
            Precio: valores.precioTotal,
            Descuento: valores.descuento,
            Fecha: formatDate(valores.fechaDeVenta.toString())
        }
        return model
    }

    const handleExport = (id: number) => {
        const json = []
        for (let i = 0; i < props.presupuestos!.length; i++) {
            if (props.presupuestos![i].id == id) {           
                json.push(crearModelo(props.presupuestos![i]))
                var wb = XLSX.utils.book_new(),
                    ws = XLSX.utils.json_to_sheet(json)
                XLSX.utils.book_append_sheet(wb, ws, "Archivo")
                XLSX.writeFile(wb, "Excel.xlsx")
                return;
            }
        }
    }

    function formatDate(fecha: string): string {
        var array = fecha.split("T")
        return array[0]
    }

    const botones = (urlDetalle: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-light" to={urlDetalle}>Detalle</Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-danger">
                Borrar
            </Button>
            <Button style={{ marginRight: '1rem', marginLeft: '1rem' }} className="btn btn-info" onClick={() => handleExport(id)}>Exportar</Button>
        </>




    return (
        <Verificar listado={props.presupuestos}>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Descuento aplicado</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.presupuestos?.map((presupuesto) => (
                            <tr key={presupuesto.id}>
                                <td>{presupuesto.nombre}</td>
                                <td>{presupuesto.descuento}</td>
                                <td>{formatDate(presupuesto.fechaDeVenta.toString())}</td>
                                <td>{presupuesto.precioTotal}</td>
                                <td>
                                    {botones(`ventas/detalle/${presupuesto.id}`, presupuesto.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Verificar>
    )
}

interface propsListadoPresupuestos {
    presupuestos?: presupuestoModel[];
}