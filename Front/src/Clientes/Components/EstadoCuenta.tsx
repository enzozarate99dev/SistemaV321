import { Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlClientes, urlVentas } from "../../Generales/endpoints";
import { clienteModel, operacionesCliente } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import VerIcon from "../../assets/VerIcon";
import DetalleVentas from "../../Ventas/Components/DetalleVentas";
import ImprimirIcon from "../../assets/ImprimirIcon";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function EstadoCuenta(props: estadoCuentaProps) {
  const [estadoCuentaCliente, setEstadoCuentaCliente] = useState<any[]>([]);
  const [info, setInfo] = useState(false);
  // const [id, setId] = useState<number>();
  const [detalle, setDetalle] = useState<any>();

  const showInfo = () => {
    setInfo(!info);
  };

  useEffect(() => {
    async function getVentasCliente(id: number) {
      const result = await axios.get(`${urlClientes}/ventasCliente/${id}`);
      let a: any[] = [];
      result.data.forEach((element: any) => {
        element.pagos.forEach((pago: any) => {
          const metodosDePago = pago?.metodosDePago?.map((metodo: any) => metodo.nombreMetodo.toUpperCase())?.filter(Boolean);
          const array = a.concat([
            //recibos
            {
              id_recibo: pago?.id_pago,
              fechaDeVenta: pago?.fecha.slice(0, 10),
              tipoComprobante: "Recibo",
              metodoDePago: metodosDePago?.join(" - "),
              debe: 0,
              haber: "$" + pago?.importe,
              saldo: 0,
              // acciones: element.acciones,
            },
          ]);
          a = array;
        });
        //facturas
        const array = a.concat([
          {
            id_venta: element.id_venta,
            fechaDeVenta: element.fechaDeVenta.slice(0, 10),
            tipoComprobante: element.tipoComprobante,
            metodoDePago: " - ",
            debe: "$" + element.precioTotal,
            haber: 0,
            saldo: "$" + element.precioTotal,
            acciones: element.acciones,
            cliente: element.cliente,
            clienteId: element.clienteId,
          },
        ]);
        a = array;
      });
      //devolver array ordenado
      setEstadoCuentaCliente(a.sort((a, b) => new Date(b.fechaDeVenta).getTime() - new Date(a.fechaDeVenta).getTime()));
    }
    getVentasCliente(props.clienteId);
  }, [props.clienteId]);

  const verDetallesVenta = (idVenta: number) => (
    <>
      <Button
        style={{ marginRight: "1rem" }}
        className="btn btn-transparent"
        onClick={async () => {
          const dataVenta = (await axios.get(`${urlVentas}/${idVenta}`)).data;
          const arr = {
            clienteInfor: {},
            articulos: dataVenta.ventaLines,
          };
          setDetalle(arr);
          showInfo();
          // setId(idVenta);
        }}
      >
        <VerIcon />
      </Button>
    </>
  );

  const verDetallesRecibo = () => (
    <>
      <Button style={{ marginRight: "1rem" }} className="btn btn-transparent" onClick={() => console.log(estadoCuentaCliente[0].id_recibo)}>
        <VerIcon />
      </Button>
      {/* <Button style={{ marginRight: "1rem" }} className="btn btn-transparent">
        <ImprimirIcon />
      </Button> */}
    </>
  );

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fechaDeVenta",
      key: "fechaDeVenta",
    },
    {
      title: "Tipo",
      dataIndex: "tipoComprobante",
      key: "tipoComprobante",
    },
    {
      title: "Metodo de Pago",
      dataIndex: "metodoDePago",
      key: "metodoDePago",
    },
    {
      title: "Debe",
      dataIndex: "debe",
      key: "debe",
    },
    {
      title: "Haber",
      dataIndex: "haber",
      key: "haber",
    },
    {
      title: "Saldo",
      dataIndex: "saldo",
      key: "saldo",
    },
    {
      title: "Detalle",
      key: "detalle",
      render: (_: undefined, op: operacionesCliente) => {
        if (op.tipoComprobante === "Recibo") {
          return <div className="container">{verDetallesRecibo()}</div>;
        } else {
          return <div className="container">{verDetallesVenta(op.id_venta)}</div>;
        }
      },
    },
  ];

  return (
    <>
      <div className="container"> </div>
      <Modal width={1150} open={info} footer={null} centered onCancel={showInfo}>
        <DetalleVentas setFlagModal={showInfo} setFlagListado={props.setFlagListado} detalle={detalle} ocultarInfo={true} />
      </Modal>
      <Table columns={columns} dataSource={estadoCuentaCliente} rowKey="id_venta" />
    </>
  );
}
interface estadoCuentaProps {
  clienteId: number;
  clientes: clienteModel[];
  setFlagModal: () => void;
  setFlagListado: () => void;
}

/* 
 - Se inicializa un array vacío llamado 'a', que se utilizará para almacenar los datos de cada venta y pago. Se recorre cada elemento en el array de 
 datos que se recuperó de la API utilizando el método forEach.

 - Dentro del bucle forEach, se recorre cada 'pago' de la venta utilizando otro bucle forEach. Para cada pago, se crea un objeto separado que se 
 agrega al array 'a'. El objeto contiene detalles como la fecha de venta, el tipo de comprobante, el método de pago, el debe, el haber, el saldo 
 y las acciones asociadas con la venta y el pago. El array 'a' se actualiza para incluir el objeto creado en cada iteración.

 - Después de que se hayan agregado todos los pagos al array a, se agrega otro objeto al array que representa la factura. Este objeto 
 incluye detalles como la fecha de venta, el tipo de comprobante, el método de pago, el debe, el haber, el saldo y las acciones asociadas con la
  venta. El array 'a' se actualiza para incluir el objeto creado en esta iteración.
  
  */
