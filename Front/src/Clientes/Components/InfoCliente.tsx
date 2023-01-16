import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { clienteCrear, clienteModel } from "../../Models/clientes.model";
import { ventasModel } from "../../Models/ventas.model";
import * as services from "../Services/clientes.services";
import * as ventasServices from "../../Ventas/Services/ventas.services";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import FormularioClientes from "./FormularioClientes";

export default function InfoCliente(props: infoClienteProps) {
  const [cliente, setCliente] = useState<clienteModel>();
  const [ventasCliente, setVentasCliente] = useState<ventasModel[]>([]);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    const res = services.getCliente(props.id);
    res.then((respuesta: AxiosResponse<clienteModel>) => {
      const modelo: clienteModel = {
        nombreYApellido: respuesta.data.nombreYApellido,
        domicilio: respuesta.data.domicilio,
        telefono: respuesta.data.telefono,
        email: respuesta.data.email,
        codigoPostal: respuesta.data.codigoPostal,
        localidad: respuesta.data.localidad,
        nroDocumento: respuesta.data.nroDocumento,
        percibeIIBB: false,
        percibeIVA: false,
        provincia: respuesta.data.provincia,
        razonSocial: respuesta.data.razonSocial,
        tipoDocumento: respuesta.data.tipoDocumento,
        id: respuesta.data.id,
      };
      setCliente(modelo);
    });
  }, [props.id]);

  // este sirve para el estado de cuenta
  useEffect(() => {
    const res = ventasServices.ventasCliente(props.id);
    res.then((respuesta: AxiosResponse<ventasModel[]>) => {
      setVentasCliente(respuesta.data);
    });
  }, [props.id]);

  return (
    <div className="container">
      <MostrarErrores errores={errores} />
      {cliente ? (
        <FormularioClientes modelo={cliente} onSubmit={() => {}} />
      ) : (
        <Cargando />
      )}
      {/* <br></br>
      <h2>{cliente?.nombreYApellido}</h2>
      <h4>{cliente?.email}</h4>
      <br></br>
      <h4>Domico: {cliente?.domicilio}</h4>
      <h4>Telefono: {cliente?.telefono}</h4>
      <h4>Deuda: {cliente?.deuda}</h4>
      <br></br>
      <h4 className="btn btn-secondary" onClick={handleClick}>
        Compras hechas por el cliente
      </h4>
      {clickeado ? (
        <div className="container">
          <label htmlFor="cta">No pagados</label>
          <input
            style={{ marginLeft: "0.5rem" }}
            type="checkbox"
            name="cta"
            onClick={handleCheckbox}
          ></input>
          <br></br>
          {!checkbox
            ? ventasCliente.map((venta, index) => (
                <>
                  <Link to={`/ventas/detalle/${venta.id}`}>
                    Venta {index + 1}
                  </Link>
                  <br></br>
                </>
              ))
            : ventasCliente.map((venta, index) => (
                <>
                  {venta.adeudada > 0 ? (
                    <>
                      <Link to={`/ventas/detalle/${venta.id}`}>
                        Venta {index + 1}
                      </Link>
                      <Link
                        style={{ marginLeft: "0.5rem" }}
                        to={`/ventas/cancelar/${venta.id}`}
                      >
                        Cancelar esta deuda
                      </Link>
                      <br></br>
                    </>
                  ) : null}
                </>
              ))}
        </div>
      ) : null} */}
    </div>
  );
}

interface infoClienteProps {
  id: number;
  setFlagModal: () => void;
  setFlagListado: () => void;
}
