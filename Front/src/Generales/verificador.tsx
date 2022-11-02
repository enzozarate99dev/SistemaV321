import { ReactElement } from "react";
import Cargando from "../utils/Cargando";


export default function Verificar(props: listadoGenericoProps){
    if(!props.listado){
        return <Cargando/>
    }else if(props.listado.length===0){       
        return <>No hay elementos para mostrar</>
    }else{
        return props.children;
    }
}

interface listadoGenericoProps{
    listado: any;
    children: ReactElement;
}