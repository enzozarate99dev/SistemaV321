import FormularioProductos from "./FormularioProductos";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { productoCrear } from "../Models/producto.model";
import { urlProductos } from "../Generales/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import { convertirProductoAFormData } from "../utils/FormData";

export default function CargarProducto() {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crear(producto: productoCrear){
        try{
            const formData = convertirProductoAFormData(producto)
            await axios({
                method: 'post',
                url: urlProductos,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history.push('/');
        }
        catch (error){
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Cargar Producto</h3>
            <MostrarErrores errores={errores}/>
            <FormularioProductos modelo={{ nombre: '', precio: 0 }} onSubmit={async valores => {
                await crear(valores)
            }} />
        </>
    )
}