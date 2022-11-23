import { useState } from "react";
import { useHistory } from "react-router-dom";
import useModal from "../../Compras/Components/useModal";
import { productoCrear } from "../../Models/producto.model";
import { convertirProductoAFormData } from "../../utils/FormData";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/productos.services";
import FormularioProductos from "./FormularioProductos";



export default function CargarProducto(props: cargarProductoProps) {
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();
    const {toggle} = useModal()

    async function crear(producto:productoCrear) {
        try{
            services.crear(producto)
            if(!props.popUp){
                history.push('/listadoProductos');
            }else{
                history.goBack()
            }
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h2 style={{marginTop:'1rem'}}>Añadir un producto</h2>
            <MostrarErrores errores={errores}/>
            <FormularioProductos modelo={{ nombre: '', precio: 0, cantidad: 0 }} onSubmit={async valores => {
                await crear(valores)
            }} popUp={props.popUp}/>
        </>
    )
}

interface cargarProductoProps{
    popUp: boolean;
}

CargarProducto.defaultProps = {
    popUp: false
}


