import { Table } from "antd";
import { clienteModel } from "../../Models/clientes.model";

export default function EstadoCuenta(props: estadoCuentaProps) {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "fechaDeVenta",
      key: "fechaDeVenta",
    },
    {
      title: "Nombre",
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
      <div className="container">$300</div>
      <Table columns={columns} />
    </>
  );
}
interface estadoCuentaProps {
  setFlagModal: () => void;
  setFlagListado: () => void;
}
