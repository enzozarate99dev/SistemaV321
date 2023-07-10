import { ventasModel } from "../../Models/ventas.model";
import { useEffect, useState } from "react";
import * as servicesClientes from "../../Clientes/Services/clientes.services";
import * as servicesVentas from "../Services/ventas.services";
import confirmar from "../../utils/Confirmar";
import Button from "../../utils/Button";
import TrashIcon from "../../assets/TrashIcon";
import { Col, Table, Modal } from "antd";
import DetalleVentas from "./DetalleVentas";
import { useHistory } from "react-router-dom";
import { clienteModel } from "../../Models/clientes.model";
import axios, { AxiosResponse } from "axios";
import { urlClientes, urlVentas } from "../../Generales/endpoints";
import VerIcon from "../../assets/VerIcon";

export default function ListadoVentas(props: listadoVentasProps) {
  const [info, setInfo] = useState(false);
  const [id, setId] = useState<number>();
  const [ventas, setVentas] = useState<ventasModel[]>([]);
  const [detalle, setDetalle] = useState<any>();

  useEffect(() => {
    const result = props.ventas;
    let a: any[] = [];
    result.forEach((venta: any) => {
      venta.pagos.forEach((pago: any) => {
        const metodosDePago = pago?.metodosDePago?.map((metodo: any) => metodo.nombreMetodo.toUpperCase())?.filter(Boolean);
        const array = a.concat([
          {
            id_venta: venta.id_venta,
            precioTotal: venta.precioTotal,
            clienteId: venta.clienteId,
            sucursalId: venta.sucursalId,
            fechaDeVenta: pago?.fecha.slice(0, 10),
            tipoComprobante: "Recibo",
            metodoDePago: metodosDePago?.join(" - "),
            ventaLine: venta.ventaLines,
          },
        ]);
        a = array;
      });
    });

    //devolver array ordenado
    setVentas(a);
  }, [props.ventas]);

  const showInfo = () => {
    setInfo(!info);
  };

  async function borrar(id: number) {
    try {
      servicesVentas.borrar(id);
      props.setFlag();
    } catch (error) {}
  }

  const acciones = (venta: ventasModel) => (
    <>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-transparent"
        onClick={async () => {
          const cliente = (await axios.get(`${urlClientes}/${venta.clienteId}`)).data;
          const array = {
            clienteInfor: {
              cliente: cliente.nombreYApellido,
              domicilio: cliente.domicilio,
              nroDocumento: cliente.nroDocumento,
              email: cliente.email ? cliente.email : " - ",
              condicion: cliente.condicion ? cliente.condicion : "No especifica",
            },
            articulos: venta.ventaLine,
          };
          setDetalle(array);
          showInfo();
        }}
      >
        <VerIcon />
      </Button>
      <Button onClick={() => confirmar(() => borrar(venta.id_venta))} className="btn btn-transparent">
        <TrashIcon />
      </Button>
    </>
  );

  const columns = [
    {
      title: "N° de Venta",
      dataIndex: "id_venta",
      align: "center" as const,
      key: "id_venta",
    },
    {
      title: "Fecha",
      dataIndex: "fechaDeVenta",
      align: "center" as const,
      key: "fechaDeVenta",
    },
    {
      title: "Total",
      dataIndex: "precioTotal",
      align: "center" as const,
      key: "precioTotal",
      render: (precioTotal: number) => `$ ${precioTotal}`,
    },
    {
      title: "Forma De Pago",
      key: "metodoDePago",
      align: "center" as const,
      dataIndex: "metodoDePago",
    },
    {
      title: "Sucursal",
      key: "sucursalId",
      align: "center" as const,
      dataIndex: "sucursalId",
    },
    {
      title: "",
      align: "center" as const,
      render: (venta: ventasModel) => <div className="container">{acciones(venta)}</div>,
    },
  ];
  return (
    <>
      <Modal width={1150} open={info} footer={null} centered onCancel={showInfo}>
        <DetalleVentas setFlagModal={showInfo} setFlagListado={props.setFlag} detalle={detalle} />
      </Modal>
      <h1>Ventas</h1>
      {/* <Col lg={24}> */}
      <div className="container">
        <Table
          size="small"
          scroll={{ x: 500 }}
          dataSource={ventas}
          rowKey="id_venta"
          columns={columns}
          pagination={false}
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 10,
            marginInline: "2%",
            marginBlock: "2%",
            padding: 0,
            zIndex: -1,
          }}
        />
      </div>
      {/* </Col> */}
    </>
  );
}
export interface listadoVentasProps {
  ventas: ventasModel[];
  setFlag: () => void;
}
