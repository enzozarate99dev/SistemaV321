import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { nuevoVentasModel, ventaCancelar } from "../../Models/ventas.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/ventas.services";
import FormCancelar from "./FormCancelar";
import FormularioVentas from "./FormularioVentas";

export default function CargarVentas() {

    const history = useHistory();
    const { id }: any = useParams()
    const [errores, setErrores] = useState<string[]>([]);


    async function cancelar(venta: ventaCancelar) {
        try {
            services.cancelar(id,venta)
            history.push('/listadoClientes')
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }


    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Cargar Venta</h3>
            <MostrarErrores errores={errores} />
            <FormCancelar
                modelo={{ pago: 0 }}
                onSubmit={async valores => cancelar(valores)}
            />
        </>
    )
}