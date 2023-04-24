import { Modal, Select, Table } from "antd";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import Verificar from "../../Generales/verificador";
import { actualizar, productoModel } from "../../Models/producto.model";
import Button from "../../utils/Button";
import confirmar from "../../utils/Confirmar";
import * as services from "../Services/productos.services";
import "../styles.css";
import CargarProducto from "./CargarProducto";
import EditarProducto from "./EditarProducto";

export default function ListadoProductos(props: propsListadoProductos) {
  const [actualizarPrecios, setActualizarPrecios] = useState(false);
  const [eliminarMultiple, setEliminarMultiple] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState<number>();

  const showModal = () => {
    setOpen(!open);
    props.setFlag();
  };
  const showEdit = () => {
    setEdit(!edit);
  };

  async function borrar(id: number) {
    try {
      services.borrar(id);
      props.setFlag();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function actualizar(valores: actualizar) {
    if (valores.ids2 != null) {
      try {
        valores.ids2.map((id) => services.borrar(id));
        props.setFlag();
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      try {
        services.actualizarF(valores);
        props.setFlag();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }

  const botones = (id: number) => (
    <>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-transparent"
        onClick={() => {
          showEdit();
          setId(id);
          console.log(id);
        }}
      >
        <EditIcon />
      </Button>
      <Button onClick={() => confirmar(() => borrar(id))} className="btn btn-transparent">
        <TrashIcon />
      </Button>
    </>
  );
  const columns = [
    {
      title: "#",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Unidades",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Imagen",
      key: "imagen",
      render: (producto: productoModel) => <img width="50" height="50" src={producto.foto} alt="Poster" />,
    },
    {
      title: "",
      key: "id_producto",
      render: (_: undefined, producto: productoModel) => <div className="container">{botones(producto.id_producto)}</div>,
    },
  ];

  return (
    <>
      <Modal title="Cargar Producto" width={1150} open={open} footer={null} centered onCancel={showModal}>
        <CargarProducto setFlagModal={showModal} setFlagListado={props.setFlag} />
      </Modal>
      <Modal width={1150} open={edit} footer={null} centered onCancel={showEdit}>
        <EditarProducto id={id!} setFlagModal={showEdit} setFlagListado={props.setFlag} />
      </Modal>
      <div className="d-flex justify-content-center align-items-start">
        <Button className="btn btn-transparent " onClick={showModal}>
          <AddIcon />
        </Button>
      </div>
      <Verificar listado={props.productos}>
        <Formik initialValues={{}} onSubmit={async (valores) => await actualizar(valores)}>
          {(formikProps) => (
            <Form>
              <div className="container">
                <Table columns={columns} dataSource={props.productos} pagination={false} />
              </div>
            </Form>
          )}
        </Formik>
      </Verificar>
    </>
  );
}

interface propsListadoProductos {
  productos: productoModel[];
  setFlag: () => void;
}
