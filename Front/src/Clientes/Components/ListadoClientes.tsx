import { AutoComplete, Modal, Row, Select, Table } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/clientes.services";
import EditarCliente from "./EditarCliente";
import InfoCliente from "./InfoCliente";
import axios, { AxiosResponse } from "axios";
import { urlClientes } from "../../Generales/endpoints";
import VerIcon from "../../assets/VerIcon";
import EstadoDeudaIcon from "../../assets/EstadoDeudaIcon";
import "../clientesStyles.css";
import "../../utils/modal.css";
import EstadoCuenta from "./EstadoCuenta";
import { Input } from "antd";
import { Col } from "react-bootstrap";
import { noAuto } from "@fortawesome/fontawesome-svg-core";
import { couldStartTrivia } from "typescript";
import Paginacion from "../../utils/Paginacion";

export default function ListadoClientes(props: propsListadoClientes) {
  const [cuenta, setCuenta] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [id, setId] = useState<number>();
  const [esPantallaPequena, setEsPantallaPequena] = useState(false);
  const { Option } = Select;

  console.log(props.clientes);

  useEffect(() => {
    const handleResize = () => {
      setEsPantallaPequena(window.innerWidth <= 992);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const onChangeSelect = (value: string, id: number) => {
    console.log(value, id, "value, id");
    if (value === "info") {
      showInfo();
      setId(id);
    } else if (value === "edit") {
      setId(id);
      showEdit();
    } else if (value === "cuenta") {
      setId(id);
      showCuenta();
    } else if (value === "borrar") {
      setId(id);
      confirmar(() => borrar(id));
    }
  };

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
      render: (_: undefined, cliente: clienteModel) => {
        if (esPantallaPequena) {
          return (
            <Select style={{ maxWidth: "80%" }} onChange={(value) => onChangeSelect(value, cliente.id_cliente)} defaultValue="Acciones">
              <Option value="info">Ver información</Option>
              <Option value="edit">Editar</Option>
              <Option value="cuenta">Estado de cuenta</Option>
              <Option value="borrar">Eliminar</Option>
            </Select>
          );
        } else {
          return <div className="container">{botones(cliente.id_cliente)}</div>;
        }
      },
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
    <div className="d-flex flex-nowrap">
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
    </div>
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
          <Col style={{ display: "flex", justifyContent: "center" }} sm="12">
            <div>{props.buscador}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              size="small"
              scroll={{ x: 500 }}
              dataSource={props.clientes}
              columns={columns}
              pagination={false}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 10, marginInline: "2%", padding: 0 }}
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
  buscador: JSX.Element;
}
