import { Link, useHistory } from "react-router-dom";
import Verificar from "../../Generales/verificador";
import { modeloExcel, presupuestoModel } from "../../Models/presupuestos.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/presupuestos.services";
import * as XLSX from "xlsx"
import TrashIcon from "../../assets/TrashIcon";


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

    function crearModelo(valores: presupuestoModel) {
        var json: modeloExcel[] = []
        json[0] = {
            Id: valores.id.toString(),
            Nombre: valores.nombre,
            Precio: valores.precioTotal.toString(),
            Descuento: valores.descuento.toString(),
            Fecha: formatDate(valores.fechaDeVenta.toString()),
            IdProducto: valores.productos[0].id.toString(),
            NombreProducto: valores.productos[0].nombre,
            PrecioUnitario: valores.productos[0].precio,
            Cantidad: valores.productos[0].cantidad,
            Codigo: valores.productos[0].codigo,
            Categoria: valores.productos[0].categoria,
            Descripcion: valores.productos[0].descripcion
        }
        for (let i = 1; i < valores.productos.length; i++) {
            json[i] = {
                Id: '',
                Nombre: '',
                Precio: '',
                Descuento: '',
                Fecha: '',
                IdProducto: valores.productos[i].id.toString(),
                NombreProducto: valores.productos[i].nombre,
                PrecioUnitario: valores.productos[i].precio,
                Cantidad: valores.productos[i].cantidad,
                Codigo: valores.productos[i].codigo,
                Categoria: valores.productos[i].categoria,
                Descripcion: valores.productos[i].descripcion
            }
        }
        return json
    }


    const handleExport = (id: number) => {
        for (let i = 0; i < props.presupuestos!.length; i++) {
            if (props.presupuestos![i].id == id) {
                const json = (crearModelo(props.presupuestos![i]))
                var wb = XLSX.utils.book_new(),
                    ws = XLSX.utils.json_to_sheet(json)
                XLSX.utils.book_append_sheet(wb, ws, "Archivo")
                XLSX.writeFile(wb, `Presupuesto${props.presupuestos![i].nombre}.xlsx`)
                return;
            }
        }
    }

    function formatDate(fecha: string): string {
        var array = fecha.split("T")
        return array[0]
    }

    const botones = (id: number) =>
        <>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
            <Button style={{ marginRight: '1rem', marginLeft: '1rem' }} className="btn btn-info" onClick={() => handleExport(id)}>Exportar</Button>
        </>




    return (
        <Verificar listado={props.presupuestos}>
            <div className='container'>
                <table className='table'>
                    <thead className="table-dark">
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
                                    {botones(presupuesto.id)}
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