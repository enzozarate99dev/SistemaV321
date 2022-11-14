import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Verificar from "../../Generales/verificador";
import { actualizar, productoModel } from "../../Models/producto.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/productos.services";
import '../styles.css'


export default function ListadoProductos(props: propsListadoProductos) {
    const [actualizarPrecios, setActualizarPrecios] = useState(false)

    const history = useHistory()

    async function borrar(id: number) {
        try {
            services.borrar(id)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    async function actualizar(valores: actualizar) {
        try {
            services.actualizarF(valores)          
            history.go(0)
        }
        catch (error) {
            console.log(error)
        }
    }

    const botones = (urlEditar: string, id: number) =>
        <>
            <Link style={{ marginRight: '1rem' }} className="btn btn-success" to={urlEditar}>Editar</Link>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-danger">
                Borrar
            </Button>
        </>

    return (
        <Verificar listado={props.productos}>
                <Formik initialValues={{}} onSubmit={async (valores) => await actualizar(valores)}>
                    {(formikProps) => (
                        <Form>
                            <Button style={{marginTop:'0.5rem'}} onClick={() => { setActualizarPrecios(!actualizarPrecios)}}>Actualizar Precios</Button>
                            <table className='table table-dark-bordered'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Unidades</th>
                                        <th>Imagen</th>
                                        {actualizarPrecios ? <th>Actualizar</th>: null}                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.productos?.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>
                                                {botones(`productos/editar/${producto.id}`, producto.id)}
                                            </td>
                                            <td>{producto.id}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.cantidad}</td>
                                            <td><img width="50" height="50" src={producto.foto} alt="Poster" /></td>
                                            {actualizarPrecios ? <td><Field style={{ marginLeft: "30px" }} name="ids" id="ids" value={producto.id.toString()} type="checkbox" /></td>: null}                                             
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        {actualizarPrecios ? <td>
                                            <Field name="valor" style={{width:'70px', }} className="form-control" placeholder="%" />
                                            <div className="form-check" style={{marginTop:'0.5rem'}}>
                                                <Field className="form-check-input"  id="aumentar" name="aumentar" type="checkbox" />
                                                <label className="form-check-label" htmlFor="aumentar">Aumento</label>
                                            </div>
                                            <div className="form-check">
                                                <Field className="form-check-input" id="descontar" name="descontar" type="checkbox" />
                                                <label className="form-check-label" htmlFor="descontar">Descuento</label>
                                            </div>
                                            <Button disabled={formikProps.isSubmitting} style={{marginTop:'0.5rem'}} type="submit">Actualizar</Button>                                         
                                        </td>: null}  
                                        
                                        <td>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
                    )}
                </Formik>
        </Verificar >
    )
}

interface propsListadoProductos {
    productos?: productoModel[];
}