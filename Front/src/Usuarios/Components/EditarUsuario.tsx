import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { usuariosCrear, usuariosEnviar, usuariosModel } from "../../Models/usuarios.model";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";
import * as services from "../Services/usuarios.services";


export default function EditarUsuarios(props: editarUsuarioProps) {

    const history = useHistory()
    const [modelo, setModelo] = useState<usuariosCrear>()


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

    useEffect(() => {
        const res = services.getSingleUser(props.id)
        res.then((respuesta: AxiosResponse<usuariosModel>) => {
            var modelo: usuariosCrear = {
                nombre: respuesta.data.userName,
                email: respuesta.data.email,
                admin: false,
                cajero: false,
                password: ""
            }
            setModelo(modelo)
            console.log(modelo)
        })

    }, [props.id])

    async function registrar(credenciales: usuariosEnviar) {
        try {
            services.registrar(credenciales)
            props.setFlagListado()
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Formik
            initialValues={modelo!}
            onSubmit={valores => convertir(valores)}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido"),
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                password: Yup.string().required("Este campo es requerido")
            })}
        >
            {(formikProps) => (
                <>
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
                            <Button
                                className="btn btn-danger"
                                style={{ marginLeft: '0.5rem' }}
                                onClick={() => {
                                    formikProps.setValues(modelo!)
                                }}>Limpiar</Button>
                            <Button
                                className="btn btn-secondary"
                                style={{ marginLeft: '0.5rem' }}
                                onClick={() => {
                                    props.setFlagModal()
                                }}>Salir</Button>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    );
}

interface editarUsuarioProps {
    setFlagModal: () => void
    setFlagListado: () => void
    id: string;
}

