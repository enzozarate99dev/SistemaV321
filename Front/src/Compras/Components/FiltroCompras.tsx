import { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterIcon from "../../assets/FilterIcon";
import { comprasModel } from "../../Models/compras.model";
import { proveedoresModel } from "../../Models/proveedores.model";
import * as provServices from "../../Proveedores/Services/proveedores.services";
import Button from "../../utils/Button";
import FormGroupFecha from "../../utils/FormGroupFecha";
import Paginacion from "../../utils/Paginacion";
import * as services from "../Services/compras.services";
import ListadoCompras from "./ListadoCompras";


export default function FiltroCompras() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [proveedores, setProveedores] = useState<proveedoresModel[]>([])
    const [compras, setCompras] = useState<comprasModel[]>()
    const [mostrarFiltros, setMostrarFiltros] = useState(false)
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)
    const [flag, setFlag] = useState(false);

    const handleFlag = () => {
        setFlag(!flag)
        console.log(flag)
    }

    const valorInicial: filtroComprasProps = {
        proveedorId: 0,
        fechaDeCompra: new Date,
        pagina: 1,
        recordsPorPagina: 10
    }


    useEffect(() => {
        const res = provServices.getProveedores()
        res.then((respuesta: AxiosResponse<proveedoresModel[]>) => {
            setProveedores(respuesta.data);
        })
    }, [])

    useEffect(() => {
        if (query.get('proveedorId')) {
            valorInicial.proveedorId = parseInt(query.get('proveedorId')!, 10)
        }
        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10)
        }
        buscarCompra(valorInicial)
    }, [flag])

    function modificarURL(valores: filtroComprasProps) {
        const queryStrings: string[] = []
        if (valores.proveedorId) {
            queryStrings.push(`proveedorId=${valores.proveedorId}`)
        }
        if (valores.fechaDeCompra) {
            queryStrings.push(`fechaDeCompra=${valores.fechaDeCompra}`)
        }
        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/listadoCompras?${queryStrings.join('&')}`)
    }

    async function buscarCompra(valores: filtroComprasProps) {
        modificarURL(valores)
        const res = services.filtrar(valores)
        res.then((respuesta: AxiosResponse<comprasModel[]>) => {
            const totalDeRegistros = parseInt(
                respuesta.headers["cantidadtotalregistros"],
                10
            );
            setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
            setCompras(respuesta.data);
        })
    }


    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Filtrar Compras</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarCompra(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <Button style={{ marginBottom: '1rem' }} onClick={() => { setMostrarFiltros(!mostrarFiltros) }} className="btn btn-secondary"><FilterIcon/></Button>

                            {mostrarFiltros ?
                                <div className="form-inline">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <Field className="form-control" as="select" name="proveedorId" onClick={() => formikProps.submitForm()}>
                                            <option value="0">Seleccione un producto</option>
                                            {proveedores.map(proveedor =>
                                                <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)}
                                        </Field>
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <FormGroupFecha campo="fechaDeCompra" label="Fecha de Venta" onClick={() => formikProps.submitForm()} />
                                    </div>
                                    <Button
                                        className="btn btn-danger mb-2"
                                        onClick={() => {
                                            formikProps.setValues(valorInicial)
                                            buscarCompra(valorInicial)
                                        }}>Limpiar</Button>
                                </div>:null}
                        </Form>

                        <ListadoCompras compras={compras} setFlag={handleFlag}/>
                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarCompra(formikProps.values)
                            }}
                        />
                    </>
                )}

            </Formik>
        </>
    )
}

export interface filtroComprasProps {
    proveedorId: number;
    fechaDeCompra: Date;
    pagina: number;
    recordsPorPagina: number;
}