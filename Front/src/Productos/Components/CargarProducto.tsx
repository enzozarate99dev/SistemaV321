import { useState } from "react";
import { useHistory } from "react-router-dom";
import { productoCrear } from "../../Models/producto.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/productos.services";
import FormularioProductos from "./FormularioProductos";



export default function CargarProducto(props: cargarProductoProps) {
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();


    async function crear(producto:productoCrear) {
        try{
            services.crear(producto)
            props.setFlagListado()
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <MostrarErrores errores={errores}/>
            <FormularioProductos modelo={{ nombre: '', precio: 0, cantidad: 0, codigo:'', descripcion:'' }} setBandera={props.setFlagModal} onSubmit={async valores => {
                await crear(valores)
            }}/>
        </>
    )
}

interface cargarProductoProps{
    setFlagModal: () => void
    setFlagListado: () => void
}



