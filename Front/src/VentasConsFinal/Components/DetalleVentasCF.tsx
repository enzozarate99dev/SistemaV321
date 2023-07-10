import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import * as services from "../Services/consumidorFinal.services";

export default function DetalleVentasCF(props: infoVentaCFProps) {
  const [venta, setVenta] = useState<ventasConsumidorFinalModel>();

  useEffect(() => {
    const res = services.getVenta(props.id);
    res.then((respuesta: AxiosResponse<ventasConsumidorFinalModel>) => {
      respuesta.data.fechaDeVenta = new Date(respuesta.data.fechaDeVenta);
      setVenta(respuesta.data);
    });
  }, [props.id]);

  return (
    <div className="container">
      <h4>Detalle de venta {props.id}</h4>
      <h5>Cliente: {venta?.nombreCliente}</h5>
      <table className="table">
        <thead>
          <tr className="table-warning">
            <th>Nombre del producto</th>
            <th>Precio por unidad</th>
            <th>Cantidad vendida</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {venta?.productos.map((producto) => (
            <tr className="table-secondary" key={venta?.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>{producto.cantidad}</td>
              <td>{(producto.cantidad * producto.precio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <br></br>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th className="table-warning">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="table-secondary">{venta?.precioTotal?.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

interface infoVentaCFProps {
  id: number;
  setFlagModal: () => void;
  setFlagListado: () => void;
}
