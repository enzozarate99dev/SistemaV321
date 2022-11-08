import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ventaCancelar } from "../../Models/ventas.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/ventas.services";
import FormCancelar from "./FormCancelar";

export default function CancelarVenta() {

    const history = useHistory();
    const { id }: any = useParams()
    const [errores, setErrores] = useState<string[]>([]);


    async function cancelar(venta: ventaCancelar) {
        console.log(venta)
        try {
            services.cancelar(id,venta)
            history.push('/listadoClientes')
            history.go(0)
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }


    return (
        <>
            <MostrarErrores errores={errores} />
            <FormCancelar
                modelo={{ pago: 0 }}
                onSubmit={async valores => cancelar(valores)}
            />
        </>
    )
}