import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { clienteCrear } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import FormGroupText from "../../utils/FormGroupText";


export default function FormularioClientes(props: formularioClientesProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombreYApellido: Yup.string().required("Este campo es requerido").max(100, "La longitud maxima es de 100"),
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                telefono: Yup.string().required("Este campo es requerido"),
                domicilio: Yup.string().required("Este campo es requerido")
            })}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="nombreYApellido" label="Nombre Y Apellido" placeholder="Nombre del cliente" />
                    <FormGroupText campo="email" label="Email" placeholder="Correo Electronico" />
                    <FormGroupText campo="telefono" label="Telefono" placeholder="Telefono" />
                    <FormGroupText campo="domicilio" label="Domicilio" placeholder="Domicilio" />
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

interface formularioClientesProps {
    modelo: clienteCrear;
    onSubmit(
        valores: clienteCrear,
        accion: FormikHelpers<clienteCrear>
    ): void;
}