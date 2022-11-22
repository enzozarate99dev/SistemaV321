import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { proveedoresCrear } from "../../Models/proveedores.model";
import Button from "../../utils/Button";
import FormGroupText from "../../utils/FormGroupText";


export default function FormularioProveedores(props: formularioProveedoresProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido").max(100, "La longitud maxima es de 100"),
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                telefono: Yup.string().required("Este campo es requerido"),
                direccion: Yup.string().required("Este campo es requerido")
            })}
        >
            {(formikProps) => (
                <Form style={{ marginTop: '-10px' }} className="row g-3 needs-validation" noValidate>
                    <div className="col-md-6">
                        <FormGroupText campo="nombre" label="Nombre Y Apellido" placeholder="Nombre del proveedor" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="email" label="Email" placeholder="Correo Electronico" />
                    </div>

                    <div className="col-md-6">
                        <FormGroupText campo="telefono" label="Telefono" placeholder="Telefono" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="direccion" label="Direccion" placeholder="Direccion" />
                    </div>
                    <div className="col-8">
                        <Button disabled={formikProps.isSubmitting} type="submit">
                            Guardar
                        </Button>
                        <Link style={{ marginLeft: '1rem' }} className="btn btn-secondary" to="/">
                            Cancelar
                        </Link>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

interface formularioProveedoresProps {
    modelo: proveedoresCrear;
    onSubmit(
        valores: proveedoresCrear,
        accion: FormikHelpers<proveedoresCrear>
    ): void;
}