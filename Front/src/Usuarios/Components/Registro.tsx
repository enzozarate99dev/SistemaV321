import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AutenticacionContext from "../../auth/AutenticacionContext";
import { guardarTokenLocalStorage, obtenerClaims } from "../../auth/handlerJWT";
import { usuariosCrear, usuariosEnviar } from "../../Models/usuarios.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/usuarios.services";
import FormularioUsuarios from "./FormularioUsuarios";

export default function Registro() {

    const [errores, setErrores] = useState<string[]>([])
    const {actualizar} = useContext(AutenticacionContext)
    const history = useHistory()

    async function convertir(credenciales: usuariosCrear){
        var role: string = ''
        if(credenciales.admin){
            role = "admin"
        }
        if(credenciales.cajero){
            role = "cajero"
        }
        const rol: usuariosEnviar = {
            userName: credenciales.userName,
            email: credenciales.email,
            role: role,
            password: credenciales.password
        }
        registrar(rol)
    }

    async function registrar(credenciales: usuariosEnviar) {
        console.log(credenciales)
        try {
            const respuesta = await services.registrar(credenciales)
            console.log(respuesta.data)
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
            <MostrarErrores errores={errores}/>
            <FormularioUsuarios modelo={{userName: '', email: '', password: '', admin: false, cajero: false}}
                onSubmit={async valores => await convertir(valores)} />
        </>
    )
}