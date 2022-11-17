import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";
import { productoModel } from "../../Models/producto.model";
import { ventasPostGetModel } from "../../Models/ventas.model";
import { nuevoVentasCFModel, ventasConsumidorFinalCrear } from "../../Models/ventasCf.model";
import NuevoProductoPresupuesto from "../../Presupuestos/Components/NuevoProductoPresupuesto";
import { valoresPrevProps } from "../../Presupuestos/Components/Presupuesto";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../../Ventas/Services/ventas.services";
import * as servicesCF from "../Services/consumidorFinal.services";
import * as Yup from "yup"

export default function ConsumidorFinal() {

    const modelo: ventasConsumidorFinalCrear = {
        nombreCliente: '',
        efectivo: false,
        transferencia: false
    }

    const [productosDisp, setProductosDisp] = useState<productoModel[]>([])
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory()

    var valoresPrevs: valoresPrevProps[] = []
    var productosArreglo: productoModel[] = []

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

    function getProducto(id: number): productoModel {
        var retorno: productoModel = {
            id: 0,
            nombre: "",
            precio: 0,
            cantidad: 0
        }
        for (let i = 0; i < productosDisp.length; i++) {
            if (productosDisp[i].id == id) {
                retorno = productosDisp[i]
            }
        }
        return retorno
    }

    async function agregar(valores: valoresPrevProps) {
        valoresPrevs.push(valores)
        productosArreglo.push(getProducto(valoresPrevs[valoresPrevs.length - 1].productosIds!)!)
        productosArreglo[valoresPrevs.length - 1].cantidad = valores.cantidad

        console.log(productosArreglo)
        console.log(valoresPrevs)
    }

    async function quitar(id: number) {
        for (let i = 0; i < productosArreglo.length; i++) {
            if (productosArreglo[i].id == id) {
                productosArreglo.splice(i, 1)
                valoresPrevs.splice(i, 1)
            }
        }
        console.log(productosArreglo)
        console.log(valoresPrevs)
    }

    function sacarTotal(): number {
        var total: number = 0
        for (let i = 0; i < valoresPrevs.length; i++) {
            total = total + (productosArreglo[i].precio * valoresPrevs[i].cantidad)
        }
        return total
    }

    async function convertir(valores: ventasConsumidorFinalCrear) {
        console.log(valores)
        var arraygeneral = []
        for (let i = 0; i < valoresPrevs.length; i++) {
            arraygeneral[i] = [valoresPrevs[i].productosIds!, valoresPrevs[i].cantidad!]
        }
        var fDePago = ''
        if (valores.efectivo) {
            fDePago = "Efectivo"
        }
        if (valores.transferencia) {
            fDePago = "Transferencia"
        }
        var venta: nuevoVentasCFModel = {
            nombreCliente: valores.nombreCliente,
            productosIds: arraygeneral,
            formaDePago: fDePago
        }
        crear(venta)
    }

    async function crear(venta: nuevoVentasCFModel) {
        try {
            servicesCF.crear(venta)
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
                            <FormGroupText campo="nombreCliente" label="Nombre del cliente"/>
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