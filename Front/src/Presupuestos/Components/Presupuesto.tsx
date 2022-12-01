import { AxiosResponse } from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import * as Yup from "yup"
import TrashIcon from "../../assets/TrashIcon"
import { presupuestoCrear } from "../../Models/presupuestos.model"
import { productoModel } from "../../Models/producto.model"
import { ventasPostGetModel } from "../../Models/ventas.model"
import Button from "../../utils/Button"
import FormGroupText from "../../utils/FormGroupText"
import MostrarErrores from "../../utils/MostrarErrores"
import * as services from "../../Ventas/Services/ventas.services"
import * as presServices from "../Services/presupuestos.services"
import NuevoProductoPresupuesto from "./NuevoProductoPresupuesto"

export default function Presupuesto(props: crearPresupuestoProps) {

    const modelo: presupuestoProps = {
        nombre: '',
        descuento: 0
    }

    const [productosDisp, setProductosDisp] = useState<productoModel[]>([])
    const [productosArreglo, setProductosArreglo] = useState<productoModel[]>([])
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory()

    useEffect(() => {
        const res = services.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            setProductosDisp(respuesta.data.productos);
        })
    }, [])


    const modeloPrevs: valoresPrevProps = {
        productosIds: 0,
        cantidad: 0
    }

    function getProducto(valores: valoresPrevProps): productoModel {
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
        const obj=getProducto(valores)
        if (productosArreglo.includes(obj)) {
            const i = productosArreglo.indexOf(obj)
            productosArreglo[i].cantidad = parseInt(productosArreglo[i].cantidad.toString()) + parseInt(valores.cantidad.toString())
        } else {
            obj.cantidad = valores.cantidad
            setProductosArreglo([...productosArreglo, obj])
        }
    }

    async function quitar(id: number) {
        const newProds = productosArreglo.filter(prod => prod.id !== id)
        setProductosArreglo(newProds)
    }

    function sacarTotal(): number {
        var total: number = 0
        for (let i = 0; i < productosArreglo.length; i++) {
            total = total + (productosArreglo[i].precio * productosArreglo[i].cantidad)
        }
        return total
    }

    async function convertir(valores: presupuestoProps) {
        var arraygeneral = []
        for (let i = 0; i < productosArreglo.length; i++) {
            arraygeneral[i] = [productosArreglo[i].id, productosArreglo[i].cantidad!]
        }
        var presupuesto: presupuestoCrear = {
            nombre: valores.nombre,
            productosIds: arraygeneral,
            descuento: valores.descuento
        }
        crear(presupuesto)
    }

    function crear(presupuesto: presupuestoCrear) {
        try {
            presServices.crear(presupuesto)
            props.setFlagListado()
        }
        catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <Formik initialValues={modelo} onSubmit={valores => {
                convertir(valores)
            }}
            validationSchema={Yup.object({ nombre: Yup.string().required("Este campo es requerido") })}
            >
                {(formikProps) => (
                    <>
                        <Form>
                            <FormGroupText campo="nombre" label="Nombre" />
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
                                                    {productosArreglo.map((producto) => (
                                                        <tr key={producto.id}>
                                                            <td>{producto.id}</td>
                                                            <td>{producto.nombre}</td>
                                                            <td>{producto.precio.toFixed(2)}</td>
                                                            <td>{producto.cantidad}</td>
                                                            <td>{(producto.cantidad * producto.precio).toFixed(2)}</td>
                                                            <td><Button className="btn btn-transparent" onClick={()=>quitar(producto.id)}><TrashIcon/></Button></td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>${sacarTotal().toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Form>
                                    </>
                                )}
                            </Formik>


                            {/* <Button onClick={() => setDescuento(!descuento)}>Aplicar Descuento</Button> */}
                            <div className="col-md-4">
                                <div className="input-group has-validation">                                 
                                    <FormGroupText style={{ width: '150px' }} campo="descuento" label="Descuento" />
                                    <span style={{ height: '38px', marginTop: '32px' }} className="input-group-text" id="inputGroupPrepend">%</span>
                                </div>
                            </div>
                            <Button onClick={() => formikProps.submitForm()} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                Crear Presupuesto
                            </Button>
                            <Link style={{ marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }} className="btn btn-secondary" to="/">
                                Cancelar
                            </Link>
                        </Form>
                        <MostrarErrores errores={errores} />
                    </>
                )}
            </Formik>
        </>
    )
}

export interface presupuestoProps {
    nombre: string;
    descuento: number;
}

export interface valoresPrevProps {
    productosIds: number
    cantidad: number
}

interface crearPresupuestoProps{
    setFlagModal: () => void
    setFlagListado: () => void
}