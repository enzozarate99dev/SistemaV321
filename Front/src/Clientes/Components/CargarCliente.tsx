import { useState } from "react";
import { useHistory } from "react-router-dom";
import { clienteCrear } from "../../Models/clientes.model";
import MostrarErrores from "../../utils/MostrarErrores";
import FormularioClientes from "./FormularioClientes";
import * as services from "../Services/clientes.services"

export default function CargarCliente(props: cargarClienteProps) {

    const history = useHistory();
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