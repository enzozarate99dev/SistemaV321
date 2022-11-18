import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import TrashIcon from "../../assets/TrashIcon";
import { productoModel } from "../../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasPostGetModel } from "../../Models/ventas.model";
import NuevoProductoPresupuesto from "../../Presupuestos/Components/NuevoProductoPresupuesto";
import { valoresPrevProps } from "../../Presupuestos/Components/Presupuesto";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/ventas.services";

export default function Ventas() {

    const modelo: ventasCrear = {
        clienteId: 0,
        efectivo: false,
        ctaCorriente: false,
        transferencia: false
    }

    const [productosDisp, setProductosDisp] = useState<productoModel[]>([])
    const [productosArreglo, setProductosArreglo] = useState<productoModel[]>([])
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory()
    const { id }: any = useParams()


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
        const obj = getProducto(valores)
        setProductosArreglo([...productosArreglo,obj])
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

    async function convertir(valores: ventasCrear) {
        var arraygeneral = []
        for (let i = 0; i < productosArreglo.length; i++) {
            arraygeneral[i] = [productosArreglo[i].id!, productosArreglo[i].cantidad!]
        }
        var fDePago = ''
        if (valores.efectivo) {
            fDePago = "Efectivo"
        }
        if (valores.ctaCorriente) {
            fDePago = "Cuenta Corriente"
        }
        if (valores.transferencia) {
            fDePago = "Transferencia"
        }
        var venta: nuevoVentasModel = {
            clienteId: id,
            productosIds: arraygeneral,
            formaDePago: fDePago
        }
        crear(venta)
    }

    function crear(venta: nuevoVentasModel) {
        try {
            services.crear(venta)
            history.push('/listadoVentas')
            history.go(0)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Cargar Venta</h3>
            <Formik initialValues={modelo} onSubmit={valores => convertir(valores)}>
                {(formikProps) => (
                    <>
                        <Form>
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


                            {/* <Button onClick={() => setDescuento(!descuento)}>Aplicar Descuento</Button> */}
                            <div className="col-md-8">
                                <FormGroupCheckbox campo="efectivo" label="Efectivo" />
                                <FormGroupCheckbox campo="ctaCorriente" label="Cuenta Corriente" />
                                <FormGroupCheckbox campo="transferencia" label="Transferencia" />
                            </div>
                            <Button onClick={() => formikProps.submitForm()} type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                Guardar
                            </Button>
                            <Link style={{ marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }} className="btn btn-secondary" to="/">
                                Cancelar
                            </Link>
                        </Form>
                        <MostrarErrores errores={errores} />
                    </>
                )}
            </Formik>
        </>);
}
