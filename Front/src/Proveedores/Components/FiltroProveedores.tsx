import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterIcon from "../../assets/FilterIcon";
import { clienteModel } from "../../Models/clientes.model";
import { proveedoresModel } from "../../Models/proveedores.model";
import Button from "../../utils/Button";
import Paginacion from "../../utils/Paginacion";
import * as services from "../Services/proveedores.services";
import ListadoProveedores from "./ListadoProveedores";
import ListadoClientes from "./ListadoProveedores";

export default function FiltroProveedores() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [proveedores, setProveedores] = useState<proveedoresModel[]>()
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)
    const [mostrarFiltros, setMostrarFiltros] = useState(false)
    const [flag, setFlag] = useState(false);

    const handleFlag = () => {
        setFlag(!flag)
        console.log(flag)
    }

    const valorInicial: filtroProveedoresProps = {
        nombre: '',
        pagina: 1,
        recordsPorPagina: 10
    }

    useEffect(() => {

        if (query.get('nombre')) {
            valorInicial.nombre = query.get('nombre')!;
        }
        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10)
        }

        buscarProveedores(valorInicial)
    }, [flag])

    function modificarURL(valores: filtroProveedoresProps) {
        const queryStrings: string[] = []
        if (valores.nombre) {
            queryStrings.push(`nombre=${valores.nombre}`)
        }
        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/listadoProveedores?${queryStrings.join('&')}`)
    }

    function buscarProveedores(valores: filtroProveedoresProps) {
        modificarURL(valores)
        const data = services.filtrar(valores)
        data.then((respuesta: AxiosResponse<proveedoresModel[]>) => {
            const totalDeRegistros = parseInt(
                respuesta.headers["cantidadtotalregistros"],
                10
            );
            setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

            setProveedores(respuesta.data);
        })
    }

    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Administrar Proveedores</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarProveedores(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <Button style={{ marginBottom: '1rem'}} onClick={() => { setMostrarFiltros(!mostrarFiltros) }} className="btn btn-secondary"><FilterIcon/></Button>

                            {mostrarFiltros ?
                                <div className="form-inline">
                                    <div className="form-group mb-2">
                                        <label htmlFor="nombreYApellido" className="sr-only">Nombre y Apellido</label>
                                        <input type="text" className="form-control"
                                            id="nombre" placeholder="Nombre y Apellido"
                                            {...formikProps.getFieldProps('nombre')}
                                        />
                                    </div>
                                    <Button
                                        className="btn btn-primary mb-2 mx-sm-3"
                                        onClick={() => formikProps.submitForm()}>Filtrar</Button>
                                    <Button
                                        className="btn btn-danger mb-2"
                                        onClick={() => {
                                            formikProps.setValues(valorInicial)
                                            buscarProveedores(valorInicial)
                                        }}>Limpiar</Button>
                                </div> : null}
                        </Form>

                        <ListadoProveedores proveedores={proveedores} setFlag={handleFlag} />
                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarProveedores(formikProps.values)
                            }}
                        />
                    </>
                )}

            </Formik>
        </>
    )
}

export interface filtroProveedoresProps {
    nombre: string;
    pagina: number;
    recordsPorPagina: number;
}