import { useState } from "react";
import { useHistory } from "react-router-dom";
import { proveedoresCrear } from "../../Models/proveedores.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/proveedores.services";
import FormularioProveedores from "./FormularioProveedores";

export default function CargarProveedor() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crear(proveedor: proveedoresCrear) {
        console.log(proveedor)
        try {
            services.crear(proveedor)
            history.push(`/listadoProveedores`)
            history.go(0)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Cargar Proveedor</h3>
            <MostrarErrores errores={errores}/>
            <FormularioProveedores modelo={{ nombre: '', telefono: '', direccion: '', email: '' }} onSubmit={async valores => {
                crear(valores)
            }} />
        </>
    )
}