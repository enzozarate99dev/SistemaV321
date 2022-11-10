import { AxiosResponse } from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { presupuestoCrear } from "../../Models/presupuestos.model"
import { productoModel } from "../../Models/producto.model"
import { ventasPostGetModel } from "../../Models/ventas.model"
import FormGroupText from "../../utils/FormGroupText"
import MostrarErrores from "../../utils/MostrarErrores"
import * as services from "../../Ventas/Services/ventas.services"
import * as presServices from "../Services/presupuestos.services"
import NuevoProductoPresupuesto from "./NuevoProductoPresupuesto"

export default function Presupuesto() {

    const [productosDisp, setProductosDisp] = useState<productoModel[]>([])
    const [productos, setProductos] = useState([0])
    const [errores, setErrores] = useState<string[]>([]);
    const [total, setTotal] = useState<number>(0)
    const [valores, setValores] = useState<presupuestoProps>()
    const history = useHistory()

    useEffect(() => {
        const res = services.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            console.log(respuesta.data.productos)
            setProductosDisp(respuesta.data.productos);
        })
    }, [])

    const modelo: presupuestoProps = {
        nombre: '',
        productosIds: [],
        cantidad: [],
        descuento: 0
    }

    const onClickButton = () => {
        setProductos([...productos, productos.length])
    }

    function calcularMonto(){
        var tot: number = 0;
        for(let i=0;i<valores!.productosIds.length;i++){
            for(let j=0;j<productosDisp.length;j++){
                if(valores!.productosIds[i]==productosDisp[j].id){
                    tot = tot + (valores!.cantidad[i]*productosDisp[j].precio)
                }
            }      
        }
        tot = tot - (tot*(valores!.descuento/100))
        setTotal(tot)
    }

    async function convertir() {
        var arraygeneral = []
        for (let i = 0; i < valores!.productosIds.length; i++) {
            arraygeneral[i] = [valores!.productosIds[i], valores!.cantidad[i]]
        }
        var presupuesto: presupuestoCrear = {
            nombre: valores!.nombre,
            productosIds: arraygeneral,
            descuento: valores!.descuento
        }
        crear(presupuesto)
    }

    function crear(presupuesto: presupuestoCrear){
        try{
            presServices.crear(presupuesto)
            history.push('/listadoPresupuestos')
            history.go(0)
        }
        catch(error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Generar Presupuesto</h3>
            <Formik initialValues={modelo} onSubmit={valores => {
                setValores(valores)
                calcularMonto()
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <FormGroupText campo="nombre" label="Nombre"/>
                            {productos.map((producto, index) => <NuevoProductoPresupuesto formikProps={formikProps} productosDisp={productosDisp} index={index} />)}
                            <Button onClick={onClickButton} className="btn btn-warning" style={{ marginRight: '1rem', marginTop: '1rem', marginBottom: '1rem' }} type="button">
                                Añadir Producto
                            </Button>
                            <FormGroupText campo="descuento" label="% de descuento" />
                            <Button onClick={() => formikProps.submitForm()} type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                Calcular monto
                            </Button>
                            {total!=0 ? <Button onClick={convertir} type="submit" style={{ marginTop: '1rem', marginBottom: '1rem', marginLeft:'1rem' }}>
                                Crear Presupuesto
                            </Button>: null}
                            <Link style={{ marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }} className="btn btn-secondary" to="/">
                                Cancelar
                            </Link>
                        </Form>
                        <MostrarErrores errores={errores}/>
                    </>
                )}

            </Formik>
            <div>Total: ${total}</div>
        </>
    )
}

export interface presupuestoProps {
    nombre: string;
    productosIds: number[];
    cantidad: number[];
    descuento: number;
}