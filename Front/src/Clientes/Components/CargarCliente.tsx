import { useState } from "react";
import Swal from "sweetalert2";
import { clienteCrear } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/clientes.services";
import FormularioClientes from "./FormularioClientes";

export default function CargarCliente(props: cargarClienteProps) {
  const [errores, setErrores] = useState<string[]>([]);

  const modelo: clienteCrear = {
    nombreYApellido: "",
    domicilio: "",
    localidad: "",
    nroDocumento: "",
    percibeIIBB: false,
    percibeIVA: false,
    provincia: "",
    razonSocial: "",
    tipoDocumento: 0,
    nroIngresos: "",
  };

  async function crear(cliente: clienteCrear) {
    console.log(cliente);
    try {
      services.crear(cliente);
      props.setFlagListado();
      Swal.fire({
        title: "Carga Correcta!",
        text: "El cliente fue añadido correctamente",
        icon: "success",
        willClose: () => props.setFlagModal(),
      });
    } catch (error) {
      setErrores(error.response.data);
    }
  }

  return (
    <>
      <MostrarErrores errores={errores} />
      <FormularioClientes
        modelo={modelo}
        setBandera={props.setFlagModal}
        onSubmit={async (valores) => {
          await crear(valores);
        }}
        buttonExiste={true}
        button="Cargar Cliente"
      />
    </>
  );
}

interface cargarClienteProps {
  setFlagModal: () => void;
  setFlagListado: () => void;
}
