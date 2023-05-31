import { Modal } from "antd";
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
  const [sucursal, setSucursal] = useState([]);
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
          value: suc.id,
          label: suc.direccion,
        }))
      );
    }
    getSuc();
  }, []);

  console.log(sucursal);

  const botones = (nombre: string) => (
    <>
      {/* <Button
        style={{ marginRight: "1rem" }}
        onClick={() => {
          showEdit();
          setId(nombre);
        }}
        className="btn btn-transparent"
      >
        <EditIcon />
      </Button> */}
      <Button onClick={() => confirmar(() => borrar(nombre))} className="btn btn-transparent">
        <TrashIcon />
      </Button>
    </>
  );

  return (
    <>
      <h3 style={{ marginTop: "10px" }}>Administrar Usuarios</h3>
      <Button
        style={{ marginBottom: "1rem", marginLeft: "65.75rem", marginTop: "20px" }}
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
      {/* <Modal
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
      </Modal> */}
      <Verificar listado={usuarios}>
        <>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Nombre de usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Sucursal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.userName}>
                  <td>{usuario.userName}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.role}</td>
                  <td>{usuario.sucursalId}</td>
                  <td>{botones(usuario.userName)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </Verificar>
    </>
  );
}
