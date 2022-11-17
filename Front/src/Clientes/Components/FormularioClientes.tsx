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
                <Form style={{ marginTop: '-10px' }} className="row g-3 needs-validation" noValidate>
                    <div className="col-md-6">
                        <FormGroupText campo="nombreYApellido" label="Nombre Y Apellido" placeholder="Nombre del cliente" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="email" label="Email" placeholder="Correo Electronico" />
                    </div>

                    <div className="col-md-6">
                        <FormGroupText campo="telefono" label="Telefono" placeholder="Telefono" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="domicilio" label="Domicilio" placeholder="Domicilio" />
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

interface formularioClientesProps {
    modelo: clienteCrear;
    onSubmit(
        valores: clienteCrear,
        accion: FormikHelpers<clienteCrear>
    ): void;
}