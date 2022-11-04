import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCuentas } from "../../Generales/endpoints";
import { credencialesUsuario, respuestaAutenticacion } from "../../Models/auth.model";
import MostrarErrores from "../../utils/MostrarErrores";
import AutenticacionContext from "../AutenticacionContext";
import { guardarTokenLocalStorage, obtenerClaims } from "../handlerJWT";
import FormularioAuth from "./FormularioAuth";

export default function Registro() {

    const [errores, setErrores] = useState<string[]>([])
    const {actualizar} = useContext(AutenticacionContext)
    const history = useHistory()

    async function registrar(credenciales: credencialesUsuario) {
        try {
            const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales)
            guardarTokenLocalStorage(respuesta.data)
            actualizar(obtenerClaims())
            history.push("/")
            console.log(respuesta.data)
        } catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <h3>Registro</h3>
            <MostrarErrores errores={errores}/>
            <FormularioAuth modelo={{ email: '', password: '' }}
                onSubmit={async valores => await registrar(valores)} />
        </>
    )
}