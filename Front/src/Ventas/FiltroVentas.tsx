import axios, { AxiosResponse } from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { date } from "yup/lib/locale";
import { productoModel } from "../Models/producto.model";
import { listadoVentas, ventasModel, ventasPostGetModel } from "../Models/ventas.model";
import Button from "../utils/Button";
import { urlProductos, urlVentas } from "../Generales/endpoints";
import FormGroupFecha from "../utils/FormGroupFecha";
import Paginacion from "../utils/Paginacion";
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

    function formatearFecha(date: Date | null) {
        if (date != null) {
            date = new Date(date)
            const formato = new Intl.DateTimeFormat("en", {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const [
                { value: month }, ,
                { value: day }, ,
                { value: year }
            ] = formato.formatToParts(date);
            return `${year}-${month}-${day}`;
        }    
    }


    useEffect(() => {
        axios.get(`${urlVentas}/postget`)
            .then((respuesta: AxiosResponse<ventasPostGetModel>) => {
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
        /* if (query.get('fechaDeVenta')) {
            var fecha = new Date(query.get('fechaDeVenta')!).toISOString()
        } */
        console.log(query.get('fechaDeVenta'))
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
        console.log(valores)
        modificarURL(valores)
        axios.get(`${urlVentas}/filtrar`, { params: valores })
            .then((respuesta: AxiosResponse<ventasModel[]>) => {
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
            <h3>Filtrar Ventas</h3>
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

interface filtroVentasProps {
    nombreCliente: string;
    productoId: number;
    fechaDeVenta: Date;
    pagina: number;
    recordsPorPagina: number;
}