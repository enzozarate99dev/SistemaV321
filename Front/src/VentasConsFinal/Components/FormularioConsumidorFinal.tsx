import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import { ventasConsumidorFinalCrear } from "../../Models/ventasCf.model";
import NuevoProductoCF from "../../Productos/Components/NuevoProductoCF";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";


export default function FormularioConsumidorFinal(props: formularioCFVentasProps) {

    const [productos, setProductos] = useState([0])

    const onClickButton = () => {
        setProductos([...productos, productos.length])
    }

    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="nombreCliente" label="Nombre del cliente"/>
                    {productos.map((producto, index) => <NuevoProductoCF formikProps={formikProps} productosDisp={props.productosDisp} index={index} />)}
                    <Button onClick={onClickButton} className="btn btn-warning" style={{ marginRight: '1rem', marginTop: '1rem', marginBottom: '1rem' }} type="button">
                        Añadir Producto
                    </Button>
                    <FormGroupCheckbox campo="efectivo" label="Efectivo"/>
                    <FormGroupCheckbox campo="transferencia" label="Transferencia"/>  
                    <Button disabled={formikProps.isSubmitting} type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        Guardar
                    </Button>
                    <Link style={{ marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }} className="btn btn-secondary" to="/">
                        Cancelar
                    </Link>                    
                </Form>
            )}
        </Formik>
    );
}

interface formularioCFVentasProps {
    modelo: ventasConsumidorFinalCrear;
    onSubmit(
        valores: ventasConsumidorFinalCrear,
        accion: FormikHelpers<ventasConsumidorFinalCrear>
    ): void;
    productosDisp: productoModel[]
}