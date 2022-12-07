import { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
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

export default function ConsumidorFinal(props: crearVentaCFProps) {

    const modelo: ventasConsumidorFinalCrear = {
        nombreCliente: '',
        formaDePago: 0,
        tipoComprobante: "",
        iva: 0
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
        return retorno
    }

    async function agregar(valores: valoresPrevProps) {
        const obj = getProducto(valores)
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

    async function convertir(valores: ventasConsumidorFinalCrear) {
        var arraygeneral = []
        for (let i = 0; i < productosArreglo.length; i++) {
            arraygeneral[i] = [productosArreglo[i].id, productosArreglo[i].cantidad]
        }
        var venta: nuevoVentasCFModel = {
            nombreCliente: valores.nombreCliente,
            productosIds: arraygeneral,
            formaDePago: valores.formaDePago,
            tipoComprobante: valores.tipoComprobante,
            iva: valores.iva
        }
        crear(venta)
    }

    async function crear(venta: nuevoVentasCFModel) {
        try {
            servicesCF.crear(venta)
            props.setFlagListado()
            Swal.fire(
                'Carga Correcta',
                'La venta fue cargada correctamente', 'success'
            )
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
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

                            <div style={{ marginTop: '-5px' }} className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="formaDePago">Forma de Pago</label>
                                    <Field as="select" className="form-control" name="formaDePago">
                                        <option value={0}>Seleccionar forma de pago</option>
                                        <option value={1}>Contado</option>
                                        <option value={3}>Tarjeta de Debito</option>
                                        <option value={4}>Tarjeta de Credito</option>
                                        <option value={5}>Cheque</option>
                                        <option value={6}>Ticket</option>
                                        <option value={7}>Otro</option>
                                        <option value={8}>MercadoPago</option>
                                        <option value={9}>Cobro Digital</option>
                                        <option value={10}>DineroMail</option>
                                        <option value={11}>Decidir</option>
                                        <option value={12}>Todo Pago</option>
                                    </Field>
                                </div>
                                <div style={{marginTop:'5px'}} className="col-md-6">
                                    <label htmlFor="tipoComprobante">Tipo Comprobante</label>
                                    <Field as="select" className="form-control" name="tipoComprobante">
                                        <option value={0}>Seleccionar tipo de comprobante</option>
                                        <option value="FB">FACTURA B</option>
                                    </Field>
                                </div>
                                <div style={{marginTop:'5px'}} className="col-md-6">
                                    <label htmlFor="iva">IVA</label>
                                    <Field as="select" className="form-control" name="iva">
                                        <option value={0}>Seleccionar IVA</option>
                                        <option value={10.5}>10,5</option>
                                        <option value={21}>21</option>
                                        <option value={27}>27</option>
                                        <option value={2.5}>2,5</option>
                                        <option value={5}>5</option>
                                        <option value={0}>0</option>
                                    </Field>
                                </div>
                            </div>
                            <Button type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                Guardar
                            </Button>
                            <Button
                            className="btn btn-danger"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                formikProps.setValues(modelo)
                                setProductosArreglo([])
                            }}>Limpiar</Button>
                            <Button
                            className="btn btn-secondary"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                props.setFlagModal()
                            }}>Salir</Button>
                        </Form>
                        <MostrarErrores errores={errores} />
                    </>
                )}
            </Formik>
        </>);
}

interface crearVentaCFProps {
    setFlagModal: () => void
    setFlagListado: () => void
}
