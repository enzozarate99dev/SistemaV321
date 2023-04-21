import { Table } from "antd";
import { productoModel } from "../../Models/producto.model";
import { size } from "lodash";

export default function ListaProductosVenta(props: listaProductosVentaProps) {
  const columns = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];
  return (
    <>
      <Table
        dataSource={props.productos}
        columns={columns}
        showHeader={false}
        pagination={false}
        onRow={(producto: productoModel) => {
          return {
            onClick: () => props.moverProductos(producto.id_producto),
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
