import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { clienteCrear } from "../../Models/clientes.model";
import Cargando from "../../utils/Cargando";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/clientes.services";
import FormularioClientes from "./FormularioClientes";

export default function EditarCliente(props: editarClienteProps) {
  const [cliente, setCliente] = useState<clienteCrear>();
  const [errores, setErrores] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    const res = services.getCliente(props.id);
    res.then((respuesta: AxiosResponse<clienteCrear>) => {
      const modelo: clienteCrear = {
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
      };
      setCliente(modelo);
    });
  }, [props.id]);

  async function editar(clienteEditar: clienteCrear) {
    try {
      services.editar(clienteEditar, props.id);
      props.setFlagModal!();
      props.setFlagListado!();
    } catch (error) {
      setErrores(error.response.data);
    }
  }

  return (
    <>
      <MostrarErrores errores={errores} />
      {cliente ? (
        <FormularioClientes
          modelo={cliente}
          onSubmit={async (valores) => await editar(valores)}
          buttonText="EDITAR CLIENTE"
        />
      ) : (
        <Cargando />
      )}
    </>
  );
}

interface editarClienteProps {
  id: number;
  setFlagModal: () => void;
  setFlagListado: () => void;
}
