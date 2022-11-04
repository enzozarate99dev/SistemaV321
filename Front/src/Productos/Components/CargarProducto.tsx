import { useState } from "react";
import { useHistory } from "react-router-dom";
import { productoCrear } from "../../Models/producto.model";
import MostrarErrores from "../../utils/MostrarErrores";
import FormularioProductos from "./FormularioProductos";
import * as services from "../Services/productos.services";



export default function CargarProducto() {
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();

    async function crear(producto:productoCrear) {
        try{
            services.crear(producto)
            history.push('/listadoProductos');
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3 style={{marginTop:'1rem'}}>Cargar Producto</h3>
            <MostrarErrores errores={errores}/>
            <FormularioProductos modelo={{ nombre: '', precio: 0, cantidad: 0 }} onSubmit={async valores => {
                await crear(valores)
            }} />
        </>
    )
}

