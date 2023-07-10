import { productoCrear } from "../../Models/producto.model";
import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import { sucursalModel } from "../../Models/sucursal.model";
import "../styles.css";
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
        <p>Nombre</p>
        <Form.Item name="nombre" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Nombre del producto" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <p>Precio</p>
        <Form.Item name="precio" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Precio" disabled={disabled} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <p>Categoría</p>
        <Form.Item name="categoria" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Categoría" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <p>Código</p>
        <Form.Item name="codigo" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Código" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <p>Cantidad</p>
        <Form.Item name="cantidad" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Cantidad" />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <p>Descripción</p>
        <Form.Item name="descripcion" rules={[{ required: true, message: "" }]}>
          <Input.TextArea placeholder="Descripción" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <p>Sucursal</p>
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
  );
}

interface formularioProductosProps {
  modelo: productoCrear;
  onSubmit(valores: productoCrear): void;
  setBandera?: () => void;
  disabled?: boolean;
  buttonText?: string;
  buttonExiste: boolean;
  sucursal: sucursalModel[];
}
