import { Checkbox, Form, Input, Button } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { clienteCrear } from "../../Models/clientes.model";
import * as services from "../Services/clientes.services";

export default function FormularioClientes(props: formularioClientesProps) {
  const [form] = Form.useForm();

  form.setFieldsValue({
    ["nroDocumento"]: props.modelo.nroDocumento,
    ["nombreYApellido"]: props.modelo.nombreYApellido,
    ["razonSocial"]: props.modelo.razonSocial,
    ["domicilio"]: props.modelo.domicilio,
    ["localidad"]: props.modelo.localidad,
    ["provincia"]: props.modelo.provincia,
    ["codigoPostal"]: props.modelo.codigoPostal,
    ["percibeIIBB"]: props.modelo.percibeIIBB,
    ["percibeIVA"]: props.modelo.percibeIVA,
  });
  console.log("llegan", props.modelo);
  return (
    <Form
      form={form}
      name="basic"
      className="row g-3 needs-validation"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ marginTop: "-1px", backgroundColor: "#D9D9D9" }}
      initialValues={props.modelo}
      onFinish={props.onSubmit}
      // onValuesChange={() => {}}
      autoComplete="off"
    >
      <div className="col-md-4">
        <Form.Item name="nroDocumento" rules={[{ required: true, message: "" }]}>
          <Input placeholder="DNI / CUIT" />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="nombreYApellido" rules={[{ required: true, message: "" }]}>
          <Input placeholder="NOMBRE Y APELLIDO" />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="razonSocial" rules={[{ required: true, message: "" }]}>
          <Input placeholder="RAZON SOCIAL" defaultValue={props.modelo.razonSocial} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="domicilio" rules={[{ required: true, message: "" }]}>
          <Input placeholder="DOMICILIO" />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="localidad" rules={[{ required: true, message: "" }]}>
          <Input placeholder="LOCALIDAD" />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="provincia" rules={[{ required: true, message: "" }]}>
          <Input placeholder="PROVINCIA" />
        </Form.Item>
      </div>
      <div className="col-md-4" hidden={true}>
        <Form.Item name="codigoPostal" rules={[{ required: true, message: "" }]}>
          <Input />
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
        <div className="col-md-7">
          <Form.Item name="percibeIIBB" valuePropName="checked">
            <Checkbox>Percibe IIBB</Checkbox>
          </Form.Item>

          <Form.Item name="percibeIVA" valuePropName="checked">
            <Checkbox>Percibe IVA</Checkbox>
          </Form.Item>
        </div>

        <div className="col-md-8">
          <Form.Item name="nroIngresos">
            <Input placeholder="NUMERO" />
          </Form.Item>
        </div>
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

interface formularioClientesProps {
  modelo: clienteCrear;
  onSubmit(valores: clienteCrear): void;
  setBandera?: () => void;
  buttonText?: string;
  buttonExiste: boolean;
  id?: number;
}
