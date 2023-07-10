import { Table } from "antd";
import { productoModel } from "../../Models/producto.model";

export default function ListaProductosVenta(props: listaProductosVentaProps) {
  const columns = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center" as const,
      render: (text: number) => <span style={{ color: text === 0 ? "red" : "inherit" }}>{text === 0 ? "Sin Stock" : text}</span>,
    },
  ];
  return (
    <>
      <Table
        dataSource={props.productos}
        columns={columns}
        showHeader={false}
        pagination={false}
        rowKey="id_producto"
        onRow={(producto: productoModel) => {
          return {
            onClick: () => {
              if (producto.cantidad !== 0) {
                props.moverProductos(producto.id_producto);
              }
            },
            style: {
              cursor: producto.cantidad === 0 ? "not-allowed" : "pointer",
            },
            key: producto.nombre,
          };
        }}
      />
    </>
  );
}
interface listaProductosVentaProps {
  productos: productoModel[];
  moverProductos(id: number): void;
}
