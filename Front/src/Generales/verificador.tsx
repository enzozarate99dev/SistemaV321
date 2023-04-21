import { ReactElement } from "react";
import Cargando from "../utils/Cargando";

export default function Verificar(props: listadoGenericoProps) {
  if (!props.listado) {
    return <Cargando />;
  } else if (props.listado.length === 0) {
    return <>No hay elementos para mostrar</>;
  } else {
    return props.children;
  }
}

interface listadoGenericoProps {
  listado: any;
  children: ReactElement;
}
//tengo un endpoint que me devuelve productos paginados. El caso es el siguiente: esos productos llegan a un route llamado filtroProductos que contiene la funcion buscarProductos. Pero necesito que tambien puedan llegar paginados al route filtroVentas, donde hay Input que tambien quiero que ejecute la funcion buscarProductos
