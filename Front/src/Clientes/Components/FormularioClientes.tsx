import { Checkbox, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { clienteCrear } from "../../Models/clientes.model";
import * as services from "../Services/clientes.services";
import "../clientesStyles.css";

export default function FormularioClientes(props: formularioClientesProps) {
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();

  //establecer los valores iniciales del formulario utilizando los valores del objeto modelo.
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
    ["nroIngresos"]: props.modelo.nroIngresos,
  });

  useEffect(() => {
    if (props.disabled == true) {
      setDisabled(true);
    }
  }, []);

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
          <Input placeholder="DNI / CUIT" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="nombreYApellido" rules={[{ required: true, message: "" }]}>
          <Input placeholder="NOMBRE Y APELLIDO" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="razonSocial" rules={[{ required: true, message: "" }]}>
          <Input placeholder="RAZON SOCIAL" defaultValue={props.modelo.razonSocial} disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="domicilio" rules={[{ required: true, message: "" }]}>
          <Input placeholder="DOMICILIO" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="localidad" rules={[{ required: true, message: "" }]}>
          <Input placeholder="LOCALIDAD" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item name="provincia" rules={[{ required: true, message: "" }]}>
          <Input placeholder="PROVINCIA" disabled={disabled} />
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
            <Checkbox disabled={disabled}>Percibe IIBB</Checkbox>
          </Form.Item>

          <Form.Item name="percibeIVA" valuePropName="checked" initialValue={props.modelo.percibeIVA}>
            <Checkbox disabled={disabled}>Percibe IVA</Checkbox>
          </Form.Item>
        </div>

        <div className="col-md-8">
          <Form.Item name="nroIngresos">
            <Input placeholder="NUMERO" disabled={disabled} />
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
  disabled?: boolean;
}
