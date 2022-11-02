import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { urlClientes, urlVentas } from "../Generales/endpoints";
import { clienteModel } from "../Models/clientes.model";
import { ventasModel, ventasPostGetModel } from "../Models/ventas.model";
import Button from "../utils/Button";
import FormGroupFecha from "../utils/FormGroupFecha";
import Paginacion from "../utils/Paginacion";
import ListadoClientes from "./ListadoClientes";

export default function FiltroClientes() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [clientes, setClientes] = useState<clienteModel[]>()
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)

    const valorInicial: filtroClientesProps = {
        nombreYApellido: '',
        pagina: 1,
        recordsPorPagina: 10
    }

    useEffect(() => {

        if (query.get('nombreYApellido')) {
            valorInicial.nombreYApellido = query.get('nombreYApellido')!;
        }
        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10)
        }

        buscarCliente(valorInicial)
    }, [])

    function modificarURL(valores: filtroClientesProps) {
        const queryStrings: string[] = []
        if (valores.nombreYApellido) {
            queryStrings.push(`nombreYApellido=${valores.nombreYApellido}`)
        }
        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/listadoClientes?${queryStrings.join('&')}`)
    }

    function buscarCliente(valores: filtroClientesProps) {
        modificarURL(valores)
        axios.get(`${urlClientes}/filtrar`, { params: valores })
            .then((respuesta: AxiosResponse<clienteModel[]>) => {
                console.log(respuesta.data)
                const totalDeRegistros = parseInt(
                    respuesta.headers["cantidadtotalregistros"],
                    10
                );
                setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

                setClientes(respuesta.data);
            })
    }


    return (
        <>
            <h3>Filtrar Clientes</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarCliente(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="form-inline">
                                <div className="form-group mb-2">
                                    <label htmlFor="nombreYApellido" className="sr-only">Nombre y Apellido</label>
                                    <input type="text" className="form-control"
                                        id="nombreYApellido" placeholder="Nombre y Apellido"
                                        {...formikProps.getFieldProps('nombreYApellido')}
                                    />
                                </div>
                                <Button
                                    className="btn btn-primary mb-2 mx-sm-3"
                                    onClick={() => formikProps.submitForm()}>Filtrar</Button>
                                <Button
                                    className="btn btn-danger mb-2"
                                    onClick={() => {
                                        formikProps.setValues(valorInicial)
                                        buscarCliente(valorInicial)
                                    }}>Limpiar</Button>
                            </div>
                        </Form>

                        <ListadoClientes clientes={clientes} />
                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarCliente(formikProps.values)
                            }}
                        />
                    </>
                )}

            </Formik>
        </>
    )
}

interface filtroClientesProps {
    nombreYApellido: string;
    pagina: number;
    recordsPorPagina: number;
}