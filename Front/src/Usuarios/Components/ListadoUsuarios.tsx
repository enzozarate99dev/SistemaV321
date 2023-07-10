import { Modal, Table } from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/AddIcon";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { usuariosModel } from "../../Models/usuarios.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/usuarios.services";
import EditarUsuarios from "./EditarUsuario";
import Usuarios from "./Usuarios";
import { urlSucursales } from "../../Generales/endpoints";
import { sucursalModel } from "../../Models/sucursal.model";

export default function ListadoUsuarios() {
  const [usuarios, setUsuarios] = useState<usuariosModel[]>([]);
  const [sucursal, setSucursal] = useState<sucursalModel[]>([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState<string>();
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
  };

  const showEdit = () => {
    setEdit(!edit);
  };

  const showModal = () => {
    setOpen(!open);
    handleFlag();
  };

  async function borrar(nombre: string) {
    try {
      services.borrar(nombre);
      handleFlag();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const res = services.getUsuarios();
    res.then((respuesta: AxiosResponse<usuariosModel[]>) => {
      setUsuarios(respuesta.data);
    });
  }, [flag]);

  useEffect(() => {
    async function getSuc() {
      const result = await axios(`${urlSucursales}`);
      setSucursal(
        result.data.map((suc: sucursalModel) => ({
          id: suc.id,
          direccion: suc.direccion,
        }))
      );
    }
    getSuc();
  }, []);

  const botones = (nombre: string) => (
    <>
      <Button
        style={{ marginRight: "1rem" }}
        onClick={() => {
          showEdit();
          setId(nombre);
        }}
        className="btn btn-transparent"
      >
        <EditIcon />
      </Button>
      <Button onClick={() => confirmar(() => borrar(nombre))} className="btn btn-transparent">
        <TrashIcon />
      </Button>
    </>
  );

  const columns = [
    {
      title: "Nombre de usuario",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Sucursal",
      dataIndex: "sucursalId",
      key: "sucursalId",
      render: (sucursalId: number) => {
        const suc = sucursal.find((s) => s.id === sucursalId);
        return suc ? suc.direccion : "sad";
      },
    },
    {
      title: "Acciones",
      align: "center" as const,
      key: "acciones",
      render: (_: undefined, user: usuariosModel) => {
        return <div className="container ">{botones(user.userName)}</div>;
      },
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <h3>Administrar Usuarios</h3>
      <Button
        style={{ marginBottom: "1rem" }}
        onClick={() => {
          showModal();
        }}
        className="btn btn-transparent"
      >
        <AddIcon />
      </Button>
      <Modal
        title="Cargar Usuario"
        width={1150}
        open={open}
        footer={null}
        centered
        onCancel={() => {
          showModal();
          handleFlag();
        }}
      >
        <Usuarios setFlagModal={showModal} setFlagListado={handleFlag} sucursal={sucursal} />
      </Modal>
      <Modal
        title="Editar Usuario"
        width={1150}
        open={edit}
        footer={null}
        centered
        onCancel={() => {
          showEdit();
          handleFlag();
        }}
      >
        <EditarUsuarios id={id!} setFlagModal={showEdit} setFlagListado={handleFlag} />
      </Modal>
      <Verificar listado={usuarios}>
        <div
          className="container"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
          }}
        >
          <Table columns={columns} dataSource={usuarios} rowKey="userName" pagination={{ position: ["bottomCenter"] }} />
        </div>
      </Verificar>
    </div>
  );
}
