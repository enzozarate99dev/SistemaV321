import { productoCrear } from "../../Models/producto.model";
import { Form, Input, Button, Upload, Select, InputNumber } from "antd";
import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { sucursalModel } from "../../Models/sucursal.model";
import AutenticacionContext from "../../auth/AutenticacionContext";
// import { Formik, Form } from "formik";
import FormGroupImagen from "../../utils/FormGroupImagen";
import FormGroupMarkdown from "../../utils/FormGroupMarkdown";
import FormGroupText from "../../utils/FormGroupText";
// import Button from "../../utils/Button";

export default function FormularioProductos(props: formularioProductosProps) {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  // establecer los valores iniciales del formulario utilizando los valores del objeto modelo.
  form.setFieldsValue({
    ["nombre"]: props.modelo.nombre,
    ["precio"]: props.modelo.precio,
    ["descripcion"]: props.modelo.descripcion,
    ["categoria"]: props.modelo.categoria,
    ["codigo"]: props.modelo.codigo,
    ["cantidad"]: props.modelo.cantidad,
    ["sucursalId"]: props.modelo.sucursalId,
    // ["foto"]: props.modelo.foto,
  });

  return (
    <Form
      form={form}
      name="basic"
      className="row g-3 needs-validation"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: "-1px", backgroundColor: "#D9D9D9" }}
      // initialValues={props.modelo}
      onFinish={(values) => {
        props.onSubmit(values);
      }}
      autoComplete="off"
    >
      <div className="col-md-4">
        <Form.Item name="nombre" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Nombre del producto" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="precio" rules={[{ required: true, message: "" }]}>
          <>
            <Input placeholder="Precio" disabled={disabled} />
          </>
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item name="categoria" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Categoría" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="codigo" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Código" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="cantidad" rules={[{ required: true, message: "" }]}>
          <>
            <Input placeholder="Cantidad" />
          </>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="descripcion" rules={[{ required: true, message: "" }]}>
          <Input.TextArea placeholder="Descripción" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="sucursalId" rules={[{ required: true, message: "" }]}>
          <>
            <Select
              id="sucursalId"
              showSearch
              placeholder="Sucursal"
              value={form.getFieldValue("sucursalId") || undefined}
              options={props.sucursal}
            />
          </>
        </Form.Item>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginInline: "20vw",
        }}
      >
        {/* <div className="col-md-7">
          <div className="col-md-4">
            <Form.Item label="" name="foto">
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Foto</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div> */}
      </div>
      {props.buttonExiste ? (
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
          <Button htmlType="submit" style={{ backgroundColor: "#D9D9D9", borderColor: "#36D643", color: "#424242" }}>
            {props.buttonText}
          </Button>
        </div>
      ) : null}
    </Form>
    // <Formik initialValues={props.modelo} onSubmit={props.onSubmit}>
    //   {(formikProps) => (
    //     <Form style={{ marginTop: "-10px" }} className="row g-3 needs-validation" noValidate>
    //       <div className="col-md-4">
    //         <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre del producto" />
    //       </div>
    //       <div className="col-md-4">
    //         <div className="input-group has-validation">
    //           <span style={{ height: "38px", marginTop: "32px" }} className="input-group-text" id="inputGroupPrepend">
    //             $
    //           </span>
    //           <FormGroupText campo="precio" label="Precio" placeholder="Precio del producto ($)" />
    //         </div>
    //       </div>
    //       <div className="col-md-4">
    //         <FormGroupText campo="cantidad" label="Cantidad disponible" placeholder="Cantidad disponible" />
    //       </div>
    //       <div className="col-md-6">
    //         <FormGroupText campo="codigo" label="Codigo" placeholder="Codigo" />
    //       </div>
    //       <div className="col-md-6">
    //         <FormGroupText campo="categoria" label="Categoria" placeholder="Categoria" />
    //       </div>
    //       <div className="col-md-8">
    //         <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL} />
    //       </div>
    //       <div className="col-md-10">
    //         <Select
    //           id="sucursalId"
    //           style={{ width: "100%" }}
    //           options={props.sucursal}
    //           onChange={(value) => formikProps.setFieldValue("sucursalId", value)}
    //           value={formikProps.values.sucursalId}
    //         />
    //       </div>
    //       <div className="col-md-10">
    //         <FormGroupMarkdown campo="descripcion" label="Descripcion" />
    //       </div>

    //       <div className="col-12">
    //         <Button disabled={formikProps.isSubmitting} type="submit">
    //           Guardar
    //         </Button>
    //         <Button
    //           className="btn btn-danger"
    //           style={{ marginLeft: "0.5rem" }}
    //           onClick={() => {
    //             formikProps.setValues(props.modelo);
    //           }}
    //         >
    //           Limpiar
    //         </Button>
    //         <Button
    //           className="btn btn-secondary"
    //           style={{ marginLeft: "0.5rem" }}
    //           onClick={() => {
    //             props.setBandera!();
    //           }}
    //         >
    //           Salir
    //         </Button>
    //       </div>
    //     </Form>
    //   )}
    // </Formik>
  );
}

interface formularioProductosProps {
  modelo: productoCrear;
  onSubmit(valores: productoCrear): void;
  // onSubmit(valores: productoCrear, accion: FormikHelpers<productoCrear>): void;
  setBandera?: () => void;
  disabled?: boolean;
  buttonText?: string;
  buttonExiste: boolean;
  sucursal: sucursalModel[];
}
