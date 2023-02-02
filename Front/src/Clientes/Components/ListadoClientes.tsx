import { AutoComplete, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/clientes.services";
import CargarCliente from "./CargarCliente";
import EditarCliente from "./EditarCliente";
import InfoCliente from "./InfoCliente";
import axios from "axios";
import { urlClientes } from "../../Generales/endpoints";
import VerIcon from "../../assets/VerIcon";
import EstadoDeudaIcon from "../../assets/EstadoDeudaIcon";
import "../clientesStyles.css";
import "../../utils/modal.css";
import EstadoCuenta from "./EstadoCuenta";
import AddIcon from "../../assets/AddIcon";

export default function ListadoClientes(props: propsListadoClientes) {
  const [cuenta, setCuenta] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [id, setId] = useState<number>();

  const [clientes, setClientes] = useState<clienteModel[]>([]);
  // const [clientesAgregados, setClientesAgregados] = useState<number[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<clienteModel>({} as clienteModel);
  const [clientesTabla, setClientesTabla] = useState<clienteModel[]>([]);

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

  const resetForm = () => {
    console.log("reset");
  };

  useEffect(() => {
    async function traerClientes() {
      const result = await axios.get(`${urlClientes}`);
      setClientes(
        result.data.map((cliente: clienteModel) => ({
          value: cliente.id,
          label: cliente.nombreYApellido,
        }))
      );
      setClientesTabla(result.data);
    }
    traerClientes();
  }, []);

  const columns = [
    {
      title: "DNI/CUIT",
      dataIndex: "nroDocumento",
      key: "nroDocumento",
    },
    {
      title: "Nombre",
      dataIndex: "nombreYApellido",
      key: "nombreYApellido",
    },
    {
      title: "Razon Social",
      dataIndex: "razonSocial",
      key: "razonSocial",
    },
    {
      title: "Deuda",
      dataIndex: "deuda",
      key: "deuda",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: undefined, cliente: clienteModel) => <div className="container">{botones(cliente.id)}</div>,
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

  useEffect(() => {
    if (!info) {
      setId(id);
    }
  }, [info]);

  return (
    <>
      <div className="clientes">
        <h3>Listado Clientes</h3>
        <Modal title="Informacion del cliente" width={1150} open={info} footer={null} centered onCancel={showInfo} afterClose={resetForm}>
          <InfoCliente id={id!} setFlagModal={showInfo} setFlagListado={props.setFlag} />
        </Modal>
        <Modal title="Editar Cliente" width={1150} open={edit} footer={null} centered onCancel={showEdit}>
          <EditarCliente id={id!} setFlagModal={showEdit} setFlagListado={props.setFlag} />
        </Modal>
        <Modal title="Estado de Cuenta" width={1150} open={cuenta} footer={null} centered onCancel={showCuenta}>
          <EstadoCuenta setFlagModal={showCuenta} setFlagListado={props.setFlag} />
        </Modal>
        <div>
          <AutoComplete
            className="input"
            placeholder="Buscar cliente"
            dropdownMatchSelectWidth={200}
            options={clientes}
            style={{ width: 200 }}
            onSearch={() => {}}
            open={false}
          ></AutoComplete>
          <Select placeholder="Ordenar por..." className="input" />
        </div>
        <div className="container">
          <Table
            dataSource={clientesTabla}
            columns={columns}
            pagination={{ pageSize: 5 }}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 10, margin: 40 }}
          />
        </div>
      </div>
    </>
  );
}

interface propsListadoClientes {
  clientes?: clienteModel[];
  setFlag: () => void;
}
