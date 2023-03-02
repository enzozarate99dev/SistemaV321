import { Table } from "antd";
import { useEffect, useState } from "react";
import { clienteModel, clientePagos } from "../../Models/clientes.model";

export default function EstadoCuenta(props: estadoCuentaProps) {
  const [estadoCuentaCliente, setEstadoCuentaCliente] = useState<clientePagos[]>([]);

  // useEffect(() => {
  //   setEstadoCuentaCliente(
  //     props.clientes.map((c) => ({
  //      clienteId: c.id_cliente,
  //      metodoDePago: 0,
  //     }))
  //   )
  // }, []);

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
      dataIndex: "formaDePago",
      key: "formaDePago",
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
      render: (_: undefined, cliente: clienteModel) => <div className="container">{}</div>,
    },
  ];

  return (
    <>
      <p>DEUDA</p>
      <div className="container"> </div>
      <Table
        columns={columns}
        // dataSource={estadoCuentaCliente}
      />
    </>
  );
}
interface estadoCuentaProps {
  setFlagModal: () => void;
  setFlagListado: () => void;
  // clientes: clientePagos[];
}
