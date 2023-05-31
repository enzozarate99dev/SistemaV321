import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { usuariosCrear, usuariosEnviar } from "../../Models/usuarios.model";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";
import * as services from "../Services/usuarios.services";
import { Select } from "antd";
import { sucursalModel } from "../../Models/sucursal.model";

export default function Usuarios(props: cargarUsuarioProps) {
  const modelo: usuariosCrear = { nombre: "", email: "", password: "", sucursalId: 0, admin: false, cajero: false };

  async function convertir(credenciales: usuariosCrear) {
    var role: string = "";
    if (credenciales.admin) {
      role = "admin";
    }
    if (credenciales.cajero) {
      role = "cajero";
    }
    const rol: usuariosEnviar = {
      nombre: credenciales.nombre,
      email: credenciales.email,
      role: role,
      password: credenciales.password,
      sucursalId: credenciales.sucursalId,
    };
    registrar(rol);
    console.log(rol, "role");
  }

  async function registrar(credenciales: usuariosEnviar) {
    console.log(credenciales, "credenciales");
    try {
      services.registrar(credenciales);
      props.setFlagListado();
      Swal.fire("Carga Correcta", "El usuario fue cargado correctamente", "success");
    } catch (error) {
      console.log(error.response.data);
      Swal.fire("Error al cargar", "Revisa los campos", "error");
    }
  }

  return (
    <Formik
      initialValues={modelo}
      onSubmit={(valores) => convertir(valores)}
      validationSchema={Yup.object({
        nombre: Yup.string().required("Este campo es requerido"),
        email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
        password: Yup.string().required("Este campo es requerido"),
      })}
    >
      {(formikProps) => (
        <>
          <Form style={{ marginTop: "-1px" }} className="row g-3 needs-validation">
            <div className="col-md-6">
              <FormGroupText campo="nombre" label="Nombre de usuario" placeholder="Nombre de usuario" />
            </div>
            <div className="col-md-6">
              <FormGroupText campo="email" label="Email" placeholder="Correo Electronico" />
            </div>
            <div className="col-md-6">
              <FormGroupText campo="password" label="Contraseña" placeholder="Contraseña" />
            </div>
            <div className="col-md-6 d-flex flex-column">
              <p>Sucursal</p>
              <Select
                id="sucursalId"
                style={{ width: "100%" }}
                options={props.sucursal}
                onChange={(value) => formikProps.setFieldValue("sucursalId", value)}
                value={formikProps.values.sucursalId}
              ></Select>
            </div>
            <div className="col-md-8">
              <FormGroupCheckbox campo="admin" label="Administrador" />
              <FormGroupCheckbox campo="cajero" label="Cajero" />
            </div>
            <div className="col-md-12">
              <Button onClick={() => formikProps.submitForm()}>Guardar</Button>
              <Button
                className="btn btn-danger"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  formikProps.setValues(modelo);
                }}
              >
                Limpiar
              </Button>
              <Button
                className="btn btn-secondary"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  props.setFlagModal();
                }}
              >
                Salir
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}

interface cargarUsuarioProps {
  setFlagModal: () => void;
  setFlagListado: () => void;
  sucursal: sucursalModel[];
}
