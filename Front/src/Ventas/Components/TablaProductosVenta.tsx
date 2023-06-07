import { Button, Table } from "antd";
import { productoModel } from "../../Models/producto.model";
import TrashIcon from "../../assets/TrashIcon";
import InputVentas from "../../utils/InputVentas";

export default function TablaProductosVenta({ quitarProducto, cambiarCantidad, productos }: tablaProductosVentaProps) {
  const columns = [
    {
      title: "",
      key: "accion",
      render: (producto: productoModel) => (
        <Button className="btn btn-transparent" onClick={() => quitarProducto(producto.id_producto)}>
          <TrashIcon />
        </Button>
      ),
    },
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      render: (cantidad: number, prod: productoModel) => (
        <>
          <InputVentas cambiarCantidad={cambiarCantidad} prod={prod} cantidad={prod.cantidad} />
        </>
      ),
    },
    {
      title: "Precio Unitario",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Precio Final",
      dataIndex: "precioF",
      key: "precioF",
    },
  ];
  return (
    <>
      <Table dataSource={productos} columns={columns} pagination={{ pageSize: 10 }} style={{ width: "90%" }} rowKey="id_producto" />
    </>
  );
}
interface tablaProductosVentaProps {
  productos: productoModel[];
  quitarProducto(id: number): void;
  cambiarCantidad(id: number, newCantidad: number): void;
}
