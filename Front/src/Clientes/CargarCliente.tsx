import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlClientes, urlProductos } from "../Generales/endpoints";
import { clienteCrear } from "../Models/clientes.model";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioClientes from "./FormularioClientes";

export default function CargarCliente() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crear(cliente: clienteCrear) {
        console.log(cliente)
        try {
            await axios.post(`${urlClientes}`, cliente)
            history.push(`/listadoClientes`)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <h3>Cargar Cliente</h3>
            <MostrarErrores errores={errores}/>
            <FormularioClientes modelo={{ nombreYApellido: '', telefono: '', domicilio: '', email: '' }} onSubmit={async valores => {
                await crear(valores)
            }} />
        </>
    )
}