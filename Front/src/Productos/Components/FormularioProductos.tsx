import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useModal from "../../Compras/Components/useModal";
import { productoCrear } from "../../Models/producto.model";
import Button from "../../utils/Button";
import FormGroupImagen from "../../utils/FormGroupImagen";
import FormGroupMarkdown from "../../utils/FormGroupMarkdown";
import FormGroupText from "../../utils/FormGroupText";


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
                <Form style={{ marginTop: '-10px' }} className="row g-3 needs-validation" noValidate>
                    <div className="col-md-4">
                        <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre del producto" />
                    </div>
                    <div className="col-md-4">
                        <div className="input-group has-validation">
                            <span style={{ height: '38px', marginTop: '32px' }} className="input-group-text" id="inputGroupPrepend">$</span>
                            <FormGroupText campo="precio" label="Precio" placeholder="Precio del producto ($)" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="cantidad" label="Cantidad disponible" placeholder="Cantidad disponible" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="codigo" label="Codigo" placeholder="Codigo" />
                    </div>
                    <div className="col-md-6">
                        <FormGroupText campo="categoria" label="Categoria" placeholder="Categoria" />
                    </div>
                    <div className="col-md-8">
                        <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL} />
                    </div>
                    <div className="col-md-10">
                        <FormGroupMarkdown campo="descripcion" label="Descripcion" />
                    </div>
                    <div className="col-12">
                        <Button disabled={formikProps.isSubmitting} type="submit">
                            Guardar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                formikProps.setValues(props.modelo)
                            }}>Limpiar</Button>                      
                        <Button
                            className="btn btn-secondary"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                props.setBandera!()
                            }}>Salir</Button>                      
                    </div>
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
    setBandera?: () => void;
}
