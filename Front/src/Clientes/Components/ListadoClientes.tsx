import { AutoComplete, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/clientes.services";
import EditarCliente from "./EditarCliente";
import InfoCliente from "./InfoCliente";
import axios from "axios";
import { urlClientes } from "../../Generales/endpoints";
import VerIcon from "../../assets/VerIcon";
import EstadoDeudaIcon from "../../assets/EstadoDeudaIcon";
import "../clientesStyles.css";
import "../../utils/modal.css";
import EstadoCuenta from "./EstadoCuenta";
import { Input } from "antd";
import { Col } from "react-bootstrap";

export default function ListadoClientes(props: propsListadoClientes) {
  const [cuenta, setCuenta] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [id, setId] = useState<number>();

  const [clientes, setClientes] = useState<clienteModel[]>([]);
  const [clientesTabla, setClientesTabla] = useState<clienteModel[]>([]);
  const [busqueda, setBusqueda] = useState("");

  /*
   * Manejadores de evento para mostrar/ocultar la información detallada, editar y/o el estado de cuenta de un cliente.
   * Actualizan el estado del componente padre al finalizar la operación.
   */

  const showCuenta = () => {
    setCuenta(!cuenta);
    props.setFlag();
  };
  const showEdit = () => {
    setEdit(!edit);
    props.setFlag();
  };

  const showInfo = () => {
    setInfo(!info);
    props.setFlag();
  };

  /*
   * Efecto para cargar la lista de clientes desde la API al montar el componente.
   */
  useEffect(() => {
    async function traerClientes() {
      const result = await axios.get(`${urlClientes}`);
      setClientes(
        result.data.map((cliente: clienteModel) => ({
          value: cliente.id_cliente,
          label: cliente.nombreYApellido,
        }))
      );
      setClientesTabla(result.data);
    }
    traerClientes();
  }, []);

  const filtrarClientes = clientesTabla.filter((customer) => customer.nombreYApellido.toLowerCase().includes(busqueda.toLowerCase()));

  const columns = [
    {
      title: "DNI/CUIT",
      dataIndex: "nroDocumento",
      key: "nroDocumento",
      sortDirection: ["desc", "asc"],
      sorter: (a: any, b: any) => a.nroDocumento.localeCompare(b.nroDocumento),
    },
    {
      title: "Nombre",
      dataIndex: "nombreYApellido",
      key: "nombreYApellido",
      sortDirection: ["desc", "asc"],
      sorter: (a: any, b: any) => a.nombreYApellido.localeCompare(b.nombreYApellido),
    },
    {
      title: "Razon Social",
      dataIndex: "razonSocial",
      key: "razonSocial",
      sortDirection: ["desc", "asc"],
      sorter: (a: any, b: any) => a.razonSocial.localeCompare(b.razonSocial),
    },
    {
      title: "Deuda",
      dataIndex: "deuda",
      key: "deuda",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: undefined, cliente: clienteModel) => <div className="container">{botones(cliente.id_cliente)}</div>,
    },
  ];

  async function borrar(id: number) {
    try {
      services.borrar(id);
      props.setFlag();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const botones = (id: number) => (
    <>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-transparent"
        onClick={() => {
          console.log(id, "row");
          console.log(clientesTabla, "data");
          showInfo();
          setId(id);
        }}
      >
        <VerIcon />
      </Button>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-transparent"
        onClick={() => {
          showEdit();
          setId(id);
        }}
      >
        <EditIcon />
      </Button>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-transparent"
        onClick={() => {
          showCuenta();
          setId(id);
        }}
      >
        <EstadoDeudaIcon />
      </Button>
      <Button onClick={() => confirmar(() => borrar(id))} className="btn btn-transparent">
        <TrashIcon />
      </Button>
    </>
  );

  return (
    <>
      <div className="clientes">
        <h3>Listado Clientes</h3>
        <Modal title="Informacion del cliente" width={960} open={info} footer={null} centered onCancel={showInfo}>
          <InfoCliente id={id!} setFlagModal={showInfo} setFlagListado={props.setFlag} />
        </Modal>
        <Modal title="Editar Cliente" width={960} open={edit} footer={null} centered onCancel={showEdit}>
          <EditarCliente id={id!} setFlagModal={showEdit} setFlagListado={props.setFlag} />
        </Modal>
        <Modal title="Estado de Cuenta" width={960} open={cuenta} footer={null} centered onCancel={showCuenta}>
          <EstadoCuenta setFlagModal={showCuenta} setFlagListado={props.setFlag} clienteId={id!} />
        </Modal>
        <Row>
          <Col sm="12">
            <Input placeholder="Buscar cliente" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} style={{ width: 200 }} />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Table
              dataSource={filtrarClientes}
              columns={columns}
              pagination={{ pageSize: 5 }}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 10, margin: 40 }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

interface propsListadoClientes {
  clientes: clienteModel[];
  setFlag: () => void;
}
