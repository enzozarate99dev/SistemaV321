import { productoCrear, productoModel } from "../Models/producto.model";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { Link } from "react-router-dom"
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";
import FormGroupImagen from "../utils/FormGroupImagen";


export default function FormularioProductos(props: formularioProductosProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido").max(100, "La longitud maxima es de 100"),
                precio: Yup.string().required("Este campo es requerido"),
                descripcion: Yup.string().required("Este campo es requerido"),
                categoria: Yup.string().required("Este campo es requerido"),
                codigo: Yup.string().required("Este campo es requerido"),
                cantidad: Yup.string().required("Este campo es requerido")
            })}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre del producto" />
                    <FormGroupText campo="precio" label="Precio" placeholder="Precio del producto ($)" />
                    <FormGroupText campo="cantidad" label="Cantidad disponible" placeholder="Cantidad disponible" />
                    <FormGroupText campo="codigo" label="Codigo" placeholder="Codigo" />
                    <FormGroupText campo="categoria" label="Categoria" placeholder="Categoria" />
                    <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL}/>
                    <FormGroupMarkdown campo="descripcion" label="Descripcion" />
                    <Button disabled={formikProps.isSubmitting} type="submit">
                        Guardar
                    </Button>
                    <Link style={{ marginLeft: '1rem' }} className="btn btn-secondary" to="/">
                        Cancelar
                    </Link>
                </Form>
            )}
        </Formik>
    );
}

interface formularioProductosProps {
    modelo: productoCrear;
    onSubmit(
        valores: productoCrear,
        accion: FormikHelpers<productoCrear>
    ): void;
}