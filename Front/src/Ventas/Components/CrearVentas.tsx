import { productoModel } from "../../Models/producto.model";
import { useEffect, useState } from "react";
import { ventasCrear } from "../../Models/ventas.model";
import { clienteModel } from "../../Models/clientes.model";

export default function CrearVentas(props: crearVentasProps) {
  const modelo: ventasCrear = {
    id_cliente: 0,
    formaDePago: 0,
    tratamientoImpositivo: 0,
    tipoComprobante: "",
    iva: 0,
  };

  const [productosDisp, setProductosDisp] = useState<productoModel[]>([]);
  const [productosArreglo, setProductosArreglo] = useState<productoModel[]>([]);
  const [clientes, setClientes] = useState<clienteModel[]>([]);
  const [errores, setErrores] = useState<string[]>([]);

  return <></>;
}
export interface crearVentasProps {}
