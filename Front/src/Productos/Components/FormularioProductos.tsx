import { Link } from "react-router-dom";
import * as Yup from "yup";
import useModal from "../../Compras/Components/useModal";
import { productoCrear } from "../../Models/producto.model";
import Button from "../../utils/Button";
import FormGroupImagen from "../../utils/FormGroupImagen";
import FormGroupMarkdown from "../../utils/FormGroupMarkdown";
import FormGroupText from "../../utils/FormGroupText";
// import { Checkbox, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import Upload from "antd/es/upload/Upload";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Formik, FormikHelpers } from "formik";

export default function FormularioProductos(props: formularioProductosProps) {
  // const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  // useEffect(() => {
  //   if (props.disabled == true) {
  //     setDisabled(true);
  //   }
  // }, []);

  //establecer los valores iniciales del formulario utilizando los valores del objeto modelo.
  // form.setFieldsValue({
  //   ["nombre"]: props.modelo.nombre,
  //   ["precio"]: props.modelo.precio,
  //   ["descripcion"]: props.modelo.descripcion,
  //   ["categoria"]: props.modelo.categoria,
  //   ["codigo"]: props.modelo.codigo,
  //   ["cantidad"]: props.modelo.cantidad,
  //   ["foto"]: props.modelo.foto,
  // });
  console.log(props.modelo.codigo, "modelo llega a form prod");
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
        cantidad: Yup.string().required("Este campo es requerido"),
      })}
    >
      {(formikProps) => (
        <Form style={{ marginTop: "-10px" }} className="row g-3 needs-validation" noValidate>
          <div className="col-md-4">
            <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre del producto" />
          </div>
          <div className="col-md-4">
            <div className="input-group has-validation">
              <span style={{ height: "38px", marginTop: "32px" }} className="input-group-text" id="inputGroupPrepend">
                $
              </span>
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
          {/* <div className="col-md-10">
            <FormGroupMarkdown campo="descripcion" label="Descripcion" />
          </div> */}
          <div className="col-12">
            <Button disabled={formikProps.isSubmitting} type="submit">
              Guardar
            </Button>
            <Button
              className="btn btn-danger"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => {
                formikProps.setValues(props.modelo);
              }}
            >
              Limpiar
            </Button>
            {/* <Button
              className="btn btn-secondary"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => {
                props.setBandera!();
              }}
            >
              Salir
            </Button> */}
          </div>
        </Form>
      )}
    </Formik>
    // <Form
    //   form={form}
    //   name="basic"
    //   className="row g-3 needs-validation"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   style={{ marginTop: "-1px", backgroundColor: "#D9D9D9" }}
    //   initialValues={props.modelo}
    //   onFinish={props.onSubmit}
    //   autoComplete="off"
    // >
    //   <div className="col-md-4">
    //     <Form.Item name="nombre" rules={[{ required: true, message: "" }]}>
    //       <Input placeholder="Nombre del producto" disabled={disabled} />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-4">
    //     <Form.Item name="precio" rules={[{ required: true, message: "" }]}>
    //       <Input placeholder="Precio" disabled={disabled} />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-4">
    //     <Form.Item name="descripcion" rules={[{ required: true, message: "" }]}>
    //       <Input.TextArea placeholder="Descripción" disabled={disabled} />
    //     </Form.Item>
    //   </div>

    //   <div className="col-md-4">
    //     <Form.Item name="categoria" rules={[{ required: true, message: "" }]}>
    //       <Input placeholder="Categoría" disabled={disabled} />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-4">
    //     <Form.Item name="codigo" rules={[{ required: true, message: "" }]}>
    //       <Input placeholder="Código" disabled={disabled} />
    //     </Form.Item>
    //   </div>
    //   <div className="col-md-4">
    //     <Form.Item name="cantidad" rules={[{ required: true, message: "" }]}>
    //       <Input placeholder="Cantidad" />
    //     </Form.Item>
    //   </div>
    //   <div
    //     className="container"
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       marginInline: "20vw",
    //     }}
    //   >
    //     <div className="col-md-7">
    //       <div className="col-md-4">
    //         <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL} />
    //         {/* <Form.Item label="" valuePropName="fileList">
    //           <Upload action="/upload.do" listType="picture-card">
    //             <div>
    //               <PlusOutlined />
    //               <div style={{ marginTop: 8 }}>Foto</div>
    //             </div>
    //           </Upload>
    //         </Form.Item> */}
    //       </div>
    //     </div>
    //   </div>
    //   {props.buttonExiste ? (
    //     <div className="container" style={{ display: "flex", justifyContent: "center" }}>
    //       <Button htmlType="submit" style={{ backgroundColor: "#D9D9D9", borderColor: "#36D643", color: "#424242" }}>
    //         {props.buttonText}
    //       </Button>
    //     </div>
    //   ) : null}
    // </Form>
  );
}

interface formularioProductosProps {
  modelo: productoCrear;
  // onSubmit(valores: productoCrear): void;
  onSubmit(valores: productoCrear, accion: FormikHelpers<productoCrear>): void;
  setBandera?: () => void;
  disabled?: boolean;
  buttonText?: string;
  buttonExiste: boolean;
}
