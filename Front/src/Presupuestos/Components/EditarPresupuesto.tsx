import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import TrashIcon from "../../assets/TrashIcon";
import { presupuestoCrear, presupuestoCrearPrev, presupuestoModel } from "../../Models/presupuestos.model";
import { productoModel } from "../../Models/producto.model";
import { ventasPostGetModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormGroupText from "../../utils/FormGroupText";
import MostrarErrores from "../../utils/MostrarErrores";
import * as servicesV from "../../Ventas/Services/ventas.services";
import * as services from "../Services/presupuestos.services";
import NuevoProductoPresupuesto from "./NuevoProductoPresupuesto";
import { valoresPrevProps } from "./Presupuesto";


export default function EditarPresupuesto(props: editarPresupuestoProps) {

    const [errores, setErrores] = useState<string[]>([])
    const history = useHistory()
    const [productosDisp, setProductosDisp] = useState<productoModel[]>([])
    const [productosArreglo, setProductosArreglo] = useState<productoModel[]>([])
    const [modelo, setModelo] = useState<presupuestoCrearPrev>()

    const modeloPrevs: valoresPrevProps = {
        productosIds: 0,
        cantidad: 0
    }

    useEffect(() => {
        const res = servicesV.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            setProductosDisp(respuesta.data.productos);
        })
    }, [])

    function getProducto(valores:valoresPrevProps): productoModel {
        var retorno: productoModel = {
            id: 0,
            nombre: "",
            precio: 0,
            cantidad: 0
        }
        for (let i = 0; i < productosDisp.length; i++) {
            if (productosDisp[i].id == valores.productosIds) {
                retorno = productosDisp[i]
            }
        }
        retorno.cantidad = valores.cantidad
        return retorno
    }

    async function agregar(valores: valoresPrevProps) {
        const prod = getProducto(valores)
        setProductosArreglo([...productosArreglo, prod])
        console.log(productosArreglo)
    }

    async function quitar(id: number) {
        const newProds = productosArreglo.filter(prod => prod.id !== id)
        setProductosArreglo(newProds)
    }

    useEffect(() => {
        const res = services.getPresupuesto(props.id)
        res.then((respuesta: AxiosResponse<presupuestoModel>) => {
            setProductosArreglo(respuesta.data.productos)
            const modelo: presupuestoCrearPrev = {
                nombre: respuesta.data.nombre,
                descuento: respuesta.data.descuento
            }
            setModelo(modelo)
        })
    }, [props.id])

    function sacarTotal(): number {
        var total: number = 0
        for (let i = 0; i < productosArreglo.length; i++) {
            total = total + (productosArreglo[i].precio * productosArreglo[i].cantidad)
        }
        return total
    }

    async function convertir(valores: presupuestoCrearPrev) {
        var arraygeneral = []
        for (let i = 0; i < productosArreglo.length; i++) {
            arraygeneral[i] = [productosArreglo[i].id!, productosArreglo[i].cantidad!]
        }
        var presupuesto: presupuestoCrear = {
            nombre: valores.nombre,
            productosIds: arraygeneral,
            descuento: valores.descuento
        }
        editar(presupuesto)
    }

    async function editar(presupuesto: presupuestoCrear) {
        console.log(presupuesto)
        try {
            services.editar(props.id, presupuesto)
            props.setFlagListado()
            props.setFlagModal()
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Editar Presupuesto</h3>
            {modelo ? <Formik initialValues={modelo} onSubmit={valores => convertir(valores)}>
                {(formikProps) => (
                    <>
                        <Form>
                            <FormGroupText campo="nombre" label="Nombre"/>
                            <Formik initialValues={modeloPrevs} onSubmit={valores => agregar(valores)} validationSchema={Yup.object({ cantidad: Yup.number().min(1) })}>
                                {(formikProps2) => (
                                    <>
                                        <Form>
                                            <NuevoProductoPresupuesto formikProps={formikProps2} productosDisp={productosDisp} />
                                            <Button onClick={() => {
                                                formikProps2.submitForm()
                                            }} className="btn btn-warning" style={{ marginRight: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
                                                Añadir Producto
                                            </Button>
                                            <table style={{ marginTop: '1rem' }} className='table'>
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre</th>
                                                        <th>Precio Unitario</th>
                                                        <th>Unidades</th>
                                                        <th>Subtotal</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productosArreglo.map((producto,index) => (
                                                        <tr key={producto.id}>
                                                            <td>{producto.id}</td>
                                                            <td>{producto.nombre}</td>
                                                            <td>{producto.precio}</td>
                                                            <td>{producto.cantidad}</td>
                                                            <td>{producto.cantidad * producto.precio}</td>
                                                            <td><Button className="btn btn-transparent" onClick={() => quitar(producto.id)}><TrashIcon /></Button></td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>${sacarTotal()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Form>
                                    </>
                                )}
                            </Formik>

                            <div className="col-md-8">
                                <FormGroupText campo="descuento" label="Descuento"/>
                            </div>
                            <Button /* onClick={() => formikProps.submitForm()} */ type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                Guardar
                            </Button>
                            <Link style={{ marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }} className="btn btn-secondary" to="/">
                                Cancelar
                            </Link>
                        </Form>
                        <MostrarErrores errores={errores} />
                    </>
                )}
            </Formik>: null}
        </>
    );
}

interface editarPresupuestoProps{
    id: number
    setFlagModal: () => void
    setFlagListado: () => void
}