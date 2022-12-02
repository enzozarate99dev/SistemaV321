import { useState } from "react";
import { clienteCrear } from "../../Models/clientes.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/clientes.services";
import FormularioClientes from "./FormularioClientes";

export default function CargarCliente(props: cargarClienteProps) {

    const [errores, setErrores] = useState<string[]>([]);

    async function crear(cliente: clienteCrear) {
        try {
            services.crear(cliente)
            props.setFlagListado()
            props.setFlagModal()
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <MostrarErrores errores={errores}/>
            <FormularioClientes modelo={{ nombreYApellido: '', telefono: '', domicilio: '', email: '' }} setBandera={props.setFlagModal} onSubmit={async valores => {
                await crear(valores)
            }} />
        </>
    )
}

interface cargarClienteProps{
    setFlagModal: () => void
    setFlagListado: () => void
}