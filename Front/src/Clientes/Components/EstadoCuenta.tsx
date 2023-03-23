import { Table } from "antd";
import axios, { AxiosResponse } from "axios";
import { result } from "lodash";
import { useEffect, useState } from "react";
import { urlClientes } from "../../Generales/endpoints";
import { clienteModel, ventasCliente } from "../../Models/clientes.model";
import * as services from "../Services/clientes.services";

export default function EstadoCuenta(props: estadoCuentaProps) {
  const [estadoCuentaCliente, setEstadoCuentaCliente] = useState<any[]>([]);

  useEffect(() => {
    async function getVentasCliente(id: number) {
      const result = await axios.get(`${urlClientes}/ventasCliente/${id}`);
      let a: any[] = [];
      result.data.forEach((element: any) => {
        const array = a.concat([
          //pagos
          {
            fechaDeVenta: element.pagos[0]?.fecha.slice(0, 10),
            tipoComprobante: "Recibo",
            metodoDePago:
              element.pagos[0]?.metodosDePago[0]?.nombreMetodo.toUpperCase() +
              " " +
              element.pagos[0]?.metodosDePago[1]?.nombreMetodo.toUpperCase(),
            debe: element.debe,
            haber: "$" + element.pagos[0]?.importe,
            saldo: element.saldo,
            acciones: element.acciones,
          },
          //facturas
          {
            fechaDeVenta: element.fechaDeVenta.slice(0, 10),
            tipoComprobante: element.tipoComprobante,
            metodoDePago: " - ",
            debe: "$" + element.precioTotal,
            haber: element.haber,
            saldo: element.saldo,
            acciones: element.acciones,
          },
        ]);
        a = array;
      });

      //devolver array ordenado
      setEstadoCuentaCliente(a.sort((a, b) => new Date(b.fechaDeVenta).getTime() - new Date(a.fechaDeVenta).getTime()));
    }
    getVentasCliente(props.clienteId);
  }, [props.clienteId]);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fechaDeVenta",
      key: "fechaDeVenta",
      // sortDirections: ["descend"],
      // defaultSortOrder: "ascend",
      // sorter: (a: any, b: any) => new Date(b.fechaDeVenta).getTime() - new Date(a.fechaDeVenta).getTime(),
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
      title: "Acciones",
      key: "acciones",
      // render: (_: undefined, cliente: clienteModel) => <div className="container">{}</div>,
    },
  ];

  return (
    <>
      <div className="container"> </div>
      <Table columns={columns} dataSource={estadoCuentaCliente} rowKey={(r) => r.columnaId} />
    </>
  );
}
interface estadoCuentaProps {
  clienteId: number;
  setFlagModal: () => void;
  setFlagListado: () => void;
}
