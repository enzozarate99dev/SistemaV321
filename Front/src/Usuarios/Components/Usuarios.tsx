import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { usuariosCrear, usuariosEnviar } from "../../Models/usuarios.model";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";
import * as services from "../Services/usuarios.services";


export default function Usuarios() {

    const history = useHistory()

    const modelo: usuariosCrear = { nombre: '', email: '', password: '', admin: false, cajero: false }

    async function convertir(credenciales: usuariosCrear) {
        var role: string = ''
        if (credenciales.admin) {
            role = "admin"
        }
        if (credenciales.cajero) {
            role = "cajero"
        }
        const rol: usuariosEnviar = {
            nombre: credenciales.nombre,
            email: credenciales.email,
            role: role,
            password: credenciales.password
        }
        registrar(rol)
    }

    async function registrar(credenciales: usuariosEnviar) {
        console.log(credenciales)
        try {
            services.registrar(credenciales)
            history.push('/listadoUsuarios');
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Formik
            initialValues={modelo}
            onSubmit={valores => convertir(valores)}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido"),
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                password: Yup.string().required("Este campo es requerido")
            })}
        >
            {(formikProps) => (
                <>
                    <h3>Registrar usuario</h3>
                    <Form style={{ marginTop: '-1px' }} className="row g-3 needs-validation">
                        <div className="col-md-6">
                            <FormGroupText campo="nombre" label="Nombre de usuario" placeholder="Nombre de usuario" />
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
                            <Button onClick={() => formikProps.submitForm()}>
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

