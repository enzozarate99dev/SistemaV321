import { Modal } from "antd";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from 'yup';
import TrashIcon from "../../assets/TrashIcon";
import { comprasCrear, comprasCrearPrev } from "../../Models/compras.model";
import { productoModel } from "../../Models/producto.model";
import { proveedoresModel } from "../../Models/proveedores.model";
import { ventasPostGetModel } from "../../Models/ventas.model";
import NuevoProductoPresupuesto from "../../Presupuestos/Components/NuevoProductoPresupuesto";
import { valoresPrevProps } from "../../Presupuestos/Components/Presupuesto";
import CargarProducto from "../../Productos/Components/CargarProducto";
import * as provServices from "../../Proveedores/Services/proveedores.services";
import Button from "../../utils/Button";
import MostrarErrores from "../../utils/MostrarErrores";
import * as ventasServices from "../../Ventas/Services/ventas.services";
import * as services from "../Services/compras.services";
import "./modal.css";

export default function Compras(props: crearCompraProps) {

    const modelo: comprasCrearPrev = {
        proveedorId: 0
    }

    const [productosDisp, setProductosDisp] = useState<productoModel[]>([])
    const [productosArreglo, setProductosArreglo] = useState<productoModel[]>([])
    const [proveedores, setProveedores] = useState<proveedoresModel[]>([])
    const [errores, setErrores] = useState<string[]>([]);
    const [bandera, setBandera] = useState(true)
    const [addProd, setAddProd] = useState(false)
    const history = useHistory()

    const cambiarBandera = () => {
        setBandera(!bandera)
    }

    const handleAddProd = () => {
        setAddProd(!addProd)
    }


    useEffect(() => {
        const res = ventasServices.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            setProductosDisp(respuesta.data.productos);
        })
    }, [bandera])

    useEffect(() => {
        const res = provServices.getProveedores()
        res.then((resp: AxiosResponse<proveedoresModel[]>) => {
            setProveedores(resp.data)
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
        setProductosArreglo([...productosArreglo, obj])
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

    async function convertir(valores: comprasCrearPrev) {
        var arraygeneral = []
        for (let i = 0; i < productosArreglo.length; i++) {
            arraygeneral[i] = [productosArreglo[i].id!, productosArreglo[i].cantidad!]
        }
        var compra: comprasCrear = {
            proveedorId: valores.proveedorId,
            productosIds: arraygeneral
        }
        crear(compra)
    }

    function crear(compra: comprasCrear) {
        try {
            services.crear(compra)
            props.setFlagListado()
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
                            <label htmlFor="proveedorId">Proveedor</label>
                            <select style={{ marginBottom: '5px' }} className="form-control" {...formikProps.getFieldProps(`proveedorId`)}>
                                <option value="0">--Seleccione un proveedor--</option>
                                {proveedores.map(proveedor =>
                                    <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)}
                            </select>
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
                                            <Button className="btn btn-secondary" onClick={() => {
                                                handleAddProd()
                                                cambiarBandera()
                                            }}> + </Button>
                                            <Modal
                                                title="Cargar Producto"
                                                width={1150}
                                                open={addProd}
                                                footer={null}
                                                centered
                                                onCancel={()=>{handleAddProd()
                                                cambiarBandera()}}
                                            >
                                                <p>
                                                    <CargarProducto setFlagModal={handleAddProd} setFlagListado={cambiarBandera} />
                                                </p>
                                            </Modal>
                                            {/* <Popup
                                                open={isOpen}
                                                closeOnDocumentClick
                                            >
                                                <span className="modal-box"><Button className="btn btn-danger" onClick={() => {
                                                    toggle()
                                                    cambiarBandera()
                                                }}> X </Button><CargarProducto setBandera={cambiarBandera} popUp /></span>
                                            </Popup> */}
                                            {/* <Button className="btn btn-secondary" onClick={()=>setOpen(!open)}>+</Button>
                                            {open ? <span className="modal-box"><button onClick={()=>setOpen(!open)}>X</button><CargarProducto popUp/></span>:null} */}
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

                            <Button type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
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

interface crearCompraProps {
    setFlagModal: () => void
    setFlagListado: () => void
}