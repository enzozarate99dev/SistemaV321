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
        element.pagos.forEach((pago: any) => {
          const metodosDePago = pago?.metodosDePago?.map((metodo: any) => metodo.nombreMetodo.toUpperCase())?.filter(Boolean);
          const array = a.concat([
            //pagos
            {
              fechaDeVenta: pago?.fecha.slice(0, 10),
              tipoComprobante: "Recibo",
              metodoDePago: metodosDePago?.join(" - "),
              debe: element.debe,
              haber: "$" + pago?.importe,
              saldo: element.saldo,
              acciones: element.acciones,
            },
          ]);
          a = array;
        });

        //facturas
        const array = a.concat([
          {
            fechaDeVenta: element.fechaDeVenta.slice(0, 10),
            tipoComprobante: element.tipoComprobante,
            metodoDePago: " - ",
            debe: "$" + element.precioTotal,
            haber: element.haber,
            saldo: "$" + element.precioTotal,
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

  const calcularSaldo = () => {};

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
