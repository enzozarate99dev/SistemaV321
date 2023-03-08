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
  console.log("first");
  const [cliente, setCliente] = useState<clienteModel>();
  const [ventasCliente, setVentasCliente] = useState<ventasModel[]>([]);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    console.log("llega", props.id);
    const res = services.getCliente(props.id);
    console.log("res", res);
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
        id_cliente: respuesta.data.id_cliente,
        nroIngresos: respuesta.data.nroIngresos,
      };
      setCliente(modelo);
      console.log(modelo);
    });
  }, [props.id]);

  // este sirve para el estado de cuenta
  // useEffect(() => {
  //   const res = ventasServices.ventasCliente(props.id);
  //   res.then((respuesta: AxiosResponse<ventasModel[]>) => {
  //     setVentasCliente(respuesta.data);
  //   });
  // }, [props.id]);

  return (
    <div className="container">
      <MostrarErrores errores={errores} />
      {cliente ? <FormularioClientes modelo={cliente} buttonExiste={false} onSubmit={() => {}} /> : <Cargando />}
    </div>
  );
}

interface infoClienteProps {
  id: number;
  setFlagModal: () => void;
  setFlagListado: () => void;
}
