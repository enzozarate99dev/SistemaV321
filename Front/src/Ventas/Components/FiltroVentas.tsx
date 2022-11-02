import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import { ventasModel, ventasPostGetModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormGroupFecha from "../../utils/FormGroupFecha";
import Paginacion from "../../utils/Paginacion";
import * as services from '../Services/ventas.services';
import ListadoVentas from "./ListadoVentas";

export default function FiltroVentas() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [productos, setProductos] = useState<productoModel[]>([])
    const [ventas, setVentas] = useState<ventasModel[]>()
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)

    const valorInicial: filtroVentasProps = {
        nombreCliente: '',
        productoId: 0,
        fechaDeVenta: new Date,
        pagina: 1,
        recordsPorPagina: 10
    }

    useEffect(() => {
        const res = services.getProductos()
            res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
                setProductos(respuesta.data.productos);
            })
    }, [])

    useEffect(() => {

        if (query.get('nombreCliente')) {
            valorInicial.nombreCliente = query.get('nombreCliente')!;
        }
        if (query.get('productoId')) {
            valorInicial.productoId = parseInt(query.get('productoId')!, 10)
        }
        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10)
        }
        buscarVenta(valorInicial)
    }, [])

    function modificarURL(valores: filtroVentasProps) {
        const queryStrings: string[] = []
        if (valores.nombreCliente) {
            queryStrings.push(`nombreCliente=${valores.nombreCliente}`)
        }

        if (valores.productoId) {
            queryStrings.push(`productoId=${valores.productoId}`)
        }
        if (valores.fechaDeVenta) {
            queryStrings.push(`fechaDeVenta=${valores.fechaDeVenta}`)
        }
        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/listadoVentas?${queryStrings.join('&')}`)
    }

    function buscarVenta(valores: filtroVentasProps) {
        modificarURL(valores)
        const res = services.filtrar(valores)
            res.then((respuesta: AxiosResponse<ventasModel[]>) => {
                console.log(respuesta.data)
                const totalDeRegistros = parseInt(
                    respuesta.headers["cantidadtotalregistros"],
                    10
                );
                setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

                setVentas(respuesta.data);
            })
    }


    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Filtrar Ventas</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarVenta(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="form-inline">
                                <div className="form-group mb-2">
                                    <label htmlFor="nombreCliente" className="sr-only">Nombre del cliente</label>
                                    <input type="text" className="form-control"
                                        id="nombreCliente" placeholder="Nombre del cliente"
                                        {...formikProps.getFieldProps('nombreCliente')}
                                    />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <select className="form-control" {...formikProps.getFieldProps('productoId')}>
                                        <option value="0">--Seleccione un producto--</option>
                                        {productos.map(producto =>
                                            <option key={producto.id} value={producto.id}>{producto.nombre}</option>)}
                                    </select>
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <FormGroupFecha campo="fechaDeVenta" label="Fecha de Venta" />
                                </div>
                                <Button
                                    className="btn btn-primary mb-2 mx-sm-3"
                                    onClick={() => formikProps.submitForm()}>Filtrar</Button>
                                <Button
                                    className="btn btn-danger mb-2"
                                    onClick={() => {
                                        formikProps.setValues(valorInicial)
                                        buscarVenta(valorInicial)
                                    }}>Limpiar</Button>
                            </div>
                        </Form>

                        <ListadoVentas ventas={ventas} />
                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarVenta(formikProps.values)
                            }}
                        />
                    </>
                )}

            </Formik>
        </>
    )
}

export interface filtroVentasProps {
    nombreCliente: string;
    productoId: number;
    fechaDeVenta: Date;
    pagina: number;
    recordsPorPagina: number;
}