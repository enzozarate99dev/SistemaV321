import { useState } from "react";
import { useHistory } from "react-router-dom";
import { clienteCrear } from "../../Models/clientes.model";
import MostrarErrores from "../../utils/MostrarErrores";
import FormularioClientes from "./FormularioClientes";
import * as services from "../Services/clientes.services"

export default function CargarCliente() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crear(cliente: clienteCrear) {
        try {
            services.crear(cliente)
            history.push(`/listadoClientes`)
            history.go(0)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Cargar Cliente</h3>
            <MostrarErrores errores={errores}/>
            <FormularioClientes modelo={{ nombreYApellido: '', telefono: '', domicilio: '', email: '' }} onSubmit={async valores => {
                await crear(valores)
            }} />
        </>
    )
}