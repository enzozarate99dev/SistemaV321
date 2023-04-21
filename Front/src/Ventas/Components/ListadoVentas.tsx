import { useHistory } from "react-router-dom";
import { ventasModel, pagos, metodosDePago } from "../../Models/ventas.model";
import { useEffect, useState } from "react";
import * as services from "../Services/ventas.services";
import confirmar from "../../utils/Confirmar";
import Button from "../../utils/Button";
import TrashIcon from "../../assets/TrashIcon";
import { Row, Col, Table, Modal } from "antd";
import DetalleVentas from "./DetalleVentas";

export default function ListadoVentas(props: listadoVentasProps) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const [id, setId] = useState<number>();
  const [ventas, setVentas] = useState<any[]>([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<ventasModel>();

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
            fechaDeVenta: pago?.fecha.slice(0, 10),
            tipoComprobante: "Recibo",
            metodoDePago: metodosDePago?.join(" - "),
            // pagos: pago,
            ventaLine: venta.ventaLines,
          },
        ]);
        a = array;
      });
    });

    //devolver array ordenado
    setVentas(a);
  }, [props.ventas]);
  const showModal = () => {
    setOpen(!open);
    props.setFlag();
  };

  const showInfo = () => {
    setInfo(!info);
  };

  async function borrar(id: number) {
    try {
      services.borrar(id);
      props.setFlag();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const acciones = (venta: ventasModel) => (
    <>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-info"
        onClick={() => {
          showInfo();
          setId(venta.id_venta);
          setVentaSeleccionada(venta);
        }}
      >
        Detalle
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
      key: "id_venta",
    },
    {
      title: "Fecha",
      dataIndex: "fechaDeVenta",
      key: "fechaDeVenta",
    },
    {
      title: "Total",
      dataIndex: "precioTotal",
      key: "precioTotal",
    },
    {
      title: "Forma De Pago",
      key: "metodoDePago",
      dataIndex: "metodoDePago",
    },
    {
      title: "",
      render: (venta: ventasModel) => <div className="container">{acciones(venta)}</div>,
    },
  ];
  return (
    <>
      <Modal title="Informacion del cliente" width={1150} open={info} footer={null} centered onCancel={showInfo}>
        <DetalleVentas setFlagModal={showInfo} setFlagListado={props.setFlag} venta={ventaSeleccionada!} />
      </Modal>
      <h1>Ventas</h1>
      <Col lg={24}>
        <Table
          size="small"
          scroll={{ x: 500 }}
          dataSource={ventas}
          columns={columns}
          pagination={false}
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 10, marginInline: "2%", marginBlock: "2%", padding: 0 }}
        />
      </Col>
    </>
  );
}
export interface listadoVentasProps {
  ventas: ventasModel[];
  setFlag: () => void;
}
