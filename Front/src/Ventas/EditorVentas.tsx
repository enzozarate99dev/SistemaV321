import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { productoModel } from "../Models/producto.model";
import { ventasCrear } from "../Models/ventas.model";
import NuevoProducto from "../Productos/NuevoProducto";
import Button from "../utils/Button";
import FormGroupText from "../utils/FormGroupText";


export default function EditorVentas(props: editorVentasProps) {

    const [productos, setProductos] = useState([props.modelo.productosIds.length])

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
                    <FormGroupText campo="nombreCliente" label="Nombre del Cliente" placeholder="Nombre del cliente" />
                    {props.modelo.productosIds.map((producto, index) => <NuevoProducto formikProps={formikProps} productosDisp={props.productosDisp} index={index} />)}
                    <Button onClick={onClickButton} className="btn btn-warning" style={{ marginRight: '1rem', marginTop: '1rem', marginBottom: '1rem' }} type="button">
                        Añadir Producto
                    </Button>
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

interface editorVentasProps {
    modelo: ventasCrear;
    onSubmit(
        valores: ventasCrear,
        accion: FormikHelpers<ventasCrear>
    ): void;
    productosDisp: productoModel[]
}