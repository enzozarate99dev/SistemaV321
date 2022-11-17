import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { usuariosCrear } from "../../Models/usuarios.model";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";


export default function FormularioUsuarios(props: formularioUsuariosProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido").max(100, "La longitud maxima es de 100"),
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                password: Yup.string().required("Este campo es requerido")
            })}
        >
            {(formikProps) => (
                <>
                <h3>Registrar usuario</h3>
                <Form style={{ marginTop: '-1px' }} className="row g-3 needs-validation">
                    <div className="col-md-6">
                        <FormGroupText campo="userName" label="Nombre de usuario" placeholder="Nombre de usuario" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="email" label="Email" placeholder="Correo Electronico" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="password" label="Contraseña" placeholder="Contraseña" />
                    </div>
                    <div className="col-md-8">
                        <FormGroupCheckbox campo="admin" label="Administrador" />
                        <FormGroupCheckbox campo="cajero" label="Cajero" />
                    </div>
                    <div className="col-md-12">
                        <Button disabled={formikProps.isSubmitting} type="submit">
                            Guardar
                        </Button>
                        <Link style={{ marginLeft: '1rem' }} className="btn btn-secondary" to="/">
                            Cancelar
                        </Link>
                    </div>
                </Form>
                </>
            )}
        </Formik>
    );
}

interface formularioUsuariosProps {
    modelo: usuariosCrear;
    onSubmit(
        valores: usuariosCrear,
        accion: FormikHelpers<usuariosCrear>
    ): void;
}