import { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import { ventasModel, ventasPostGetModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import Button from "../../utils/Button";
import FormGroupFecha from "../../utils/FormGroupFecha";
import Paginacion from "../../utils/Paginacion";
import * as servicesCF from '../../VentasConsFinal/Services/consumidorFinal.services';
import * as services from '../Services/ventas.services';
import ListadoVentas from "./ListadoVentas";


export default function FiltroVentas() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [productos, setProductos] = useState<productoModel[]>([])
    const [ventas, setVentas] = useState<ventasModel[]>()
    const [ventasCF, setVentasCF] = useState<ventasConsumidorFinalModel[]>()
    const [mostrarFiltros, setMostrarFiltros] = useState(false)
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)

    const valorInicial: filtroVentasProps = {
        productoId: 0,
        fechaDeVenta: new Date,
        consumidor: false,
        registrado: false,
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
        if (query.get('productoId')) {
            valorInicial.productoId = parseInt(query.get('productoId')!, 10)
        }
        if (query.get('registrado')) {
            valorInicial.registrado = true
        }
        if (query.get('consumidor')) {
            valorInicial.consumidor = true
        }
        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10)
        }
        buscarVenta(valorInicial)
        buscarVentaCF(valorInicial)
    }, [])

    function modificarURL(valores: filtroVentasProps) {
        const queryStrings: string[] = []
        if (valores.productoId) {
            queryStrings.push(`productoId=${valores.productoId}`)
        }
        if (valores.fechaDeVenta) {
            queryStrings.push(`fechaDeVenta=${valores.fechaDeVenta}`)
        }
        if (valores.registrado) {
            queryStrings.push(`registrado=${valores.registrado}`)
        }
        if (valores.consumidor) {
            queryStrings.push(`consumidor=${valores.consumidor}`)
        }
        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/listadoVentas?${queryStrings.join('&')}`)
    }

    async function buscarVentaCF(valores: filtroVentasProps) {
        modificarURL(valores)
        const res = servicesCF.filtrar(valores)
        res.then((respuesta: AxiosResponse<ventasConsumidorFinalModel[]>) => {
            const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10)
            setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
            setVentasCF(respuesta.data)
        })
    }

    async function buscarVenta(valores: filtroVentasProps) {
        modificarURL(valores)
        const res = services.filtrar(valores)
        res.then((respuesta: AxiosResponse<ventasModel[]>) => {
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
            <h3 style={{ marginTop: '1rem' }}>Filtrar Ventas</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarVentaCF(valores)
                buscarVenta(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <Button style={{ marginBottom: '1rem' }} onClick={() => { setMostrarFiltros(!mostrarFiltros) }}>Filtros</Button>

                            {mostrarFiltros ?
                                <div className="form-inline">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <select className="form-control" {...formikProps.getFieldProps('productoId')}>
                                            <option value="0">Seleccione un producto</option>
                                            {productos.map(producto =>
                                                <option key={producto.id} value={producto.id}>{producto.nombre}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <FormGroupFecha campo="fechaDeVenta" label="Fecha de Venta" />
                                    </div>
                                    <div style={{ marginLeft: '-10px' }} className="form-group mx-sm-3 mb-2">
                                        <Field className="form-check-input" id="consumidor" name="consumidor" type="checkbox" />
                                        <label htmlFor="consumidor">C. Final</label>
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <Field className="form-check-input" id="registrado" name="registrado" type="checkbox" />
                                        <label htmlFor="registrado">Cliente Registrado</label>
                                    </div>
                                    <Button
                                        className="btn btn-primary mb-2 mx-sm-3"
                                        onClick={() => formikProps.submitForm()}>Filtrar</Button>
                                    <Button
                                        className="btn btn-danger mb-2"
                                        onClick={() => {
                                            formikProps.setValues(valorInicial)
                                            buscarVentaCF(valorInicial)
                                            buscarVenta(valorInicial)
                                        }}>Limpiar</Button>
                                </div>:null}
                        </Form>

                        <ListadoVentas ventas={ventas} ventasConsFinal={ventasCF}/>
                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarVentaCF(formikProps.values)
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
    productoId: number;
    fechaDeVenta: Date;
    consumidor: boolean;
    registrado: boolean
    pagina: number;
    recordsPorPagina: number;
}