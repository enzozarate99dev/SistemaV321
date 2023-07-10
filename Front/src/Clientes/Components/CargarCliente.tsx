import { useState } from "react";
import Swal from "sweetalert2";
import { clienteCrear } from "../../Models/clientes.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/clientes.services";
import FormularioClientes from "./FormularioClientes";
import "../clientesStyles.css";

export default function CargarCliente(props: cargarClienteProps) {
  const [errores, setErrores] = useState<string[]>([]);

  const modelo: clienteCrear = {
    nombreYApellido: "",
    domicilio: "",
    telefono: " ",
    email: " ",
    codigoPostal: " ",
    localidad: "",
    nroDocumento: "",
    percibeIIBB: false,
    percibeIVA: false,
    provincia: "",
    razonSocial: "",
    tipoDocumento: 0,
    nroIngresos: "",
  };

  // console.log("modelo crear", modelo);

  async function crear(cliente: clienteCrear) {
    try {
      services.crear(cliente);
      props.setFlagListado();
      props.setFlagModal();
      Swal.fire({
        title: "CLIENTE CARGADO !",
        icon: "success",
        showConfirmButton: false,
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
        onSubmit={async (valores) => await crear(valores)}
        buttonExiste={true}
        buttonText="Cargar Cliente"
      />
    </>
  );
}

interface cargarClienteProps {
  setFlagModal: () => void;
  setFlagListado: () => void;
}
