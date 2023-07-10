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
import { sucursalModel } from "../../Models/sucursal.model";
import { Checkbox, Input, Select } from "antd";
// import { Formik } from "formik";

export default function EditarUsuarios(props: editarUsuarioProps) {
  // const [form] = Form.useForm();
  const history = useHistory();
  const [modelo, setModelo] = useState<usuariosCrear>();

  // form.setFieldsValue({
  //   nombre: modelo!.nombre,
  //   email: modelo!.email,
  //   password: modelo!.password,
  //   sucursalId: modelo!.sucursalId,
  //   admin: modelo!.admin,
  //   cajero: modelo!.cajero,
  // });

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
  }
  useEffect(() => {
    const res = services.getSingleUser(props.id);
    res.then((respuesta: AxiosResponse<usuariosModel>) => {
      var modelo: usuariosCrear = {
        nombre: respuesta.data.userName,
        email: respuesta.data.email,
        admin: false,
        cajero: false,
        password: "",
        sucursalId: respuesta.data.sucursalId,
      };
      setModelo(modelo);
    });
  }, [props.id]);

  async function registrar(credenciales: usuariosEnviar) {
    try {
      services.registrar(credenciales);
      props.setFlagListado();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    // <Form form={form} initialValues={modelo} labelCol={{ span: 8 }} onFinish={(values) => convertir(values)} autoComplete="off">
    //   <div className="col-md-6">
    //     <Form.Item name="nombre" label="Nombre de usuario">
    //       <Input placeholder="Nombre de usuario" />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-6">
    //     <Form.Item name="nombre" label="Nombre de usuario">
    //       <Input placeholder="Nombre de usuario" />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-6">
    //     <Form.Item name="email" label="Correo Electronico">
    //       <Input placeholder="Correo Electronico" />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-6">
    //     <Form.Item name="password" label="Contraseña">
    //       <Input placeholder="Contraseña" />
    //     </Form.Item>
    //   </div>

    //   <div className="col-md-8">
    //     <Form.Item name="admin" valuePropName="checked">
    //       <Checkbox>Administrador</Checkbox>
    //     </Form.Item>

    //     <Form.Item name="cajero" valuePropName="checked">
    //       <Checkbox>Cajeor</Checkbox>
    //     </Form.Item>
    //   </div>
    // </Form>
    <Formik
      initialValues={modelo!}
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
            {/* <div className="col-md-6 d-flex flex-column">
              <p>Sucursal</p>
              <Select
                style={{ width: "100%" }}
                options={options}
                onChange={(value) => formikProps.setFieldValue("sucursalId", value)}
                value={formikProps.values.sucursalId}
              ></Select>
            </div> */}
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
                  formikProps.setValues(modelo!);
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

interface editarUsuarioProps {
  setFlagModal: () => void;
  setFlagListado: () => void;
  id: string;
  // sucursal: sucursalModel[];
}
