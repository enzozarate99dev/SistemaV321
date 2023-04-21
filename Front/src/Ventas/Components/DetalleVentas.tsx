import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ventasModel } from "../../Models/ventas.model";
import * as services from "../Services/ventas.services";
import * as serClientes from "../../Clientes/Services/clientes.services";
import { clienteModel } from "../../Models/clientes.model";

export default function DetalleVentas(props: infoVentaProps) {
  const venta = props.venta;
  const ventaLine = venta.ventaLine;
  const productos = ventaLine.map((v: any) => v.producto.nombre);
  console.log(ventaLine);

  return (
    <div className="container">
      <h4 style={{ marginTop: "1rem" }}>Detalle de venta {props.venta.id_venta}</h4>
      <div>
        <p> Productos: {productos} </p>
        <p> Precio del producto: {ventaLine[0].precioUnitario} </p>
        <p> Cantidad comprada: {ventaLine[0].cantidad} </p>
      </div>
    </div>
  );
}

interface infoVentaProps {
  venta: any;
  setFlagModal: () => void;
  setFlagListado: () => void;
}
