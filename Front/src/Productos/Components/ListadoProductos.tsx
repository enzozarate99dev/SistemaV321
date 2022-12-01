import { Modal } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { actualizar, productoModel } from "../../Models/producto.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/productos.services";
import '../styles.css';
import CargarProducto from "./CargarProducto";
import EditarProducto from "./EditarProducto";


export default function ListadoProductos(props: propsListadoProductos) {
    const [actualizarPrecios, setActualizarPrecios] = useState(false)
    const [eliminarMultiple, setEliminarMultiple] = useState(false)
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState<number>()

    const showModal = () => {
        setOpen(!open);
        props.setFlag()
    };
    const showEdit = () => {
        setEdit(!edit);
    };

    const history = useHistory()

    async function borrar(id: number) {
        try {
            services.borrar(id)
            props.setFlag()
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    async function actualizar(valores: actualizar) {
        if (valores.ids2 != null) {
            try {
                valores.ids2.map(id => services.borrar(id))
                props.setFlag()
            } catch (error) {
                console.log(error.response.data)
            }
        } else {
            try {
                services.actualizarF(valores)
                props.setFlag()
            }
            catch (error) {
                console.log(error.response.data)
            }
        }
    }

    const botones = (id: number) =>
        <>
            <Button style={{ marginRight: '1rem' }} className="btn btn-transparent" onClick={()=>{
                showEdit()
                setId(id)
            }}>
                <EditIcon />
            </Button>
            <Button
                onClick={() => confirmar(() => borrar(id))}
                className="btn btn-transparent">
                <TrashIcon />
            </Button>
        </>

    return (
        <Verificar listado={props.productos}>
            <Formik initialValues={{}} onSubmit={async (valores) => await actualizar(valores)}>
                {(formikProps) => (
                    <Form>
                        <Button style={{ marginTop: '0.5rem' }} onClick={() => { setActualizarPrecios(!actualizarPrecios) }}>Actualizar Precios</Button>
                        <Button style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }} onClick={() => { setEliminarMultiple(!eliminarMultiple) }}>Eliminar Multiple</Button>
                        <Button style={{ marginTop: '0.5rem', marginLeft: '44rem' }} className="btn btn-transparent" onClick={showModal}><AddIcon /></Button>
                        <Modal
                            title="Cargar Producto"
                            width={1150}
                            open={open}
                            footer={null}
                            centered
                            onCancel={showModal}
                        >
                            <p><CargarProducto setFlagModal={showModal} setFlagListado={props.setFlag}/></p>
                        </Modal>
                        <Modal
                            title="Editar Producto"
                            width={1150}
                            open={edit}
                            footer={null}
                            centered
                            onCancel={showEdit}
                        >
                            <p><EditarProducto id={id!} setFlagModal={showEdit} setFlagListado={props.setFlag}/></p>
                        </Modal>
                        <table style={{ marginTop: '1rem' }} className='table'>
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Unidades</th>
                                    <th>Imagen</th>
                                    <th></th>
                                    {actualizarPrecios ? <th>Actualizar</th> : null}
                                    {eliminarMultiple ? <th>Eliminar</th> : null}
                                </tr>
                            </thead>
                            <tbody className="">
                                {props.productos?.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.cantidad}</td>
                                        <td><img width="50" height="50" src={producto.foto} alt="Poster" /></td>
                                        <td>
                                            {botones(producto.id)}
                                        </td>
                                        {actualizarPrecios ? <td><Field style={{ marginLeft: "30px" }} name="ids" id="ids" value={producto.id.toString()} type="checkbox" /></td> : null}
                                        {eliminarMultiple ? <td><Field style={{ marginLeft: "30px" }} name="ids2" id="ids2" value={producto.id.toString()} type="checkbox" /></td> : null}
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
                                        <Field name="valor" style={{ width: '70px', }} className="form-control" placeholder="%" />
                                        <div className="form-check" style={{ marginTop: '0.5rem' }}>
                                            <Field className="form-check-input" id="aumentar" name="aumentar" type="checkbox" />
                                            <label className="form-check-label" htmlFor="aumentar">Aumento</label>
                                        </div>
                                        <div className="form-check">
                                            <Field className="form-check-input" id="descontar" name="descontar" type="checkbox" />
                                            <label className="form-check-label" htmlFor="descontar">Descuento</label>
                                        </div>
                                        <Button disabled={formikProps.isSubmitting} style={{ marginTop: '0.5rem' }} type="submit">Actualizar</Button>
                                    </td> : null}
                                    {eliminarMultiple ? <td><Button type="submit" className="btn btn-danger"><TrashIcon /></Button></td> : null}

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
    setFlag: () => void;
}