import { Col, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/AddIcon";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/clientes.services";
import CargarCliente from "./CargarCliente";
import EditarCliente from "./EditarCliente";
import InfoCliente from "./InfoCliente";
import axios, { AxiosResponse } from "axios";
import { urlClientes } from "../../Generales/endpoints";
import VerIcon from "../../assets/VerIcon";
import EstadoDeudaIcon from "../../assets/EstadoDeudaIcon";
import "../clientesStyles.css";

export default function ListadoClientes(props: propsListadoClientes) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [id, setId] = useState<number>();

  const [clientes, setClientes] = useState<clienteModel[]>([]);
  const [clientesAgregados, setClientesAgregados] = useState<number[]>([]);
  const [clientesSeleccionado, setClientesSeleccionado] =
    useState<clienteModel | null>();
  const [clientesTabla, setClientesTabla] = useState<clienteModel[]>([]);

  // const showModal = () => {
  //   setOpen(!open);
  //   props.setFlag();
  // };
  const showEdit = () => {
    setEdit(!edit);
  };

  const showInfo = () => {
    setInfo(!info);
  };
  useEffect(() => {
    async function traerClientes() {
      const result = await axios(`${urlClientes}`);
      setClientes(
        result.data.map((cliente: clienteModel) => ({
          value: cliente.id,
          label: cliente.nombreYApellido,
        }))
      );
    }
    traerClientes();
  }, []);

  async function selectCleinte(id: number) {
    setClientesAgregados((clientesAgregados) => [...clientesAgregados, id]);
    const result = await axios(`${urlClientes}/${id}`);
    const producto = result.data;
    setClientesSeleccionado(producto);
    setClientesTabla((clientesTabla) => [...clientesTabla, producto]);
    console.log(result.data);
  }

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
      render: (_: undefined, cliente: clienteModel) => (
        <div className="container">{botones(cliente.id)}</div>
      ),
    },
  ];

  function logear(id: number) {
    console.log("adadasd");
  }
  async function borrar(id: number) {
    try {
      services.borrar(id);
      // props.setFlag();
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
        onClick={() => {}}
      >
        <EstadoDeudaIcon />
      </Button>
      <Button
        onClick={() => confirmar(() => borrar(id))}
        className="btn btn-transparent"
      >
        <TrashIcon />
      </Button>
    </>
  );

  return (
    <>
      <div className="container">
        <h3>Listado Clientes</h3>

        <div>
          <Select
            className="input"
            showSearch
            onSelect={(id) => selectCleinte(id)}
            showArrow={false}
            style={{ width: 200 }}
            placeholder="Buscar cliente "
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            listItemHeight={30}
            listHeight={90}
            options={clientes}
          />
          <Select placeholder="Ordenar por..." className="input" />
        </div>
        <Table
          dataSource={clientesTabla}
          columns={columns}
          pagination={false}
        />
      </div>
      <div className="container"></div>
    </>
  );
}

interface propsListadoClientes {
  clientes?: clienteModel[];
  // setFlag: () => void;
}

//
// );
// <Button
//         style={{
//           marginBottom: "1rem",
//           marginLeft: "65.75rem",
//           marginTop: "-85px",
//         }}
//         onClick={() => {
//           showModal();
//         }}
//         className="btn btn-transparent"
//       >
//         <AddIcon />
//       </Button>
//       <Modal
//         title="Cargar Cliente"
//         width={1150}
//         open={open}
//         footer={null}
//         centered
//         onCancel={showModal}
//       >
//         <p>
//           <CargarCliente
//             setFlagModal={showModal}
//             setFlagListado={props.setFlag}
//           />
//         </p>
//       </Modal>
//       <Modal
//         title="Editar Cliente"
//         width={1150}
//         open={edit}
//         footer={null}
//         centered
//         onCancel={showEdit}
//       >
//         <p>
//           <EditarCliente
//             id={id!}
//             setFlagModal={showEdit}
//             setFlagListado={props.setFlag}
//           />
//         </p>
//       </Modal>
//       <Modal
//         title="Informacion del cliente"
//         width={1150}
//         open={info}
//         footer={null}
//         centered
//         onCancel={showInfo}
//       >
//         <p>
//           <InfoCliente
//             id={id!}
//             setFlagModal={showInfo}
//             setFlagListado={props.setFlag}
//           />
//         </p>
//       </Modal>
//       <Verificar listado={props.clientes}>
//         <>
//           <table style={{ marginTop: "-15px" }} className="table">
//             <thead className="table-dark">
//               <tr>
//                 <th></th>
//                 <th>#</th>
//                 <th>Nombre y Apellido</th>
//                 <th>Deuda Total</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {props.clientes?.map((cliente) => (
//                 <tr key={cliente.id}>
//                   <td></td>
//                   <td>{cliente.id}</td>
//                   <td>{cliente.nombreYApellido}</td>
//                   <td>{cliente.deuda}</td>
//                   <td>{botones(cliente.id)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       </Verificar>
