import { AxiosResponse } from "axios";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function BuscarEntidad(props: buscarEntidadProps) {
  // const [totalDePaginas, setTotalDePaginas] = useState(0);
  // const [entidades, setEntidades] = useState<entidadModel[]>([]);
  // const history = useHistory();
  // const query = new URLSearchParams(useLocation().search);
  // const [flag, setFlag] = useState(false);

  // const handleFlag = () => {
  //   setFlag(!flag);
  // };

  // const valorInicial: filtroEntidadesProps = {
  //   nombre: "",
  //   pagina: 1,
  //   recordsPorPagina: 5,
  // };

  // useEffect(() => {
  //   if (query.get("nombre")) {
  //     valorInicial.nombre = query.get("nombre")!;
  //   }
  //   if (query.get("pagina")) {
  //     valorInicial.pagina = parseInt(query.get("pagina")!, 5);
  //   }

  //   buscarEntidad("tipoEntidad", valorInicial);
  // }, [flag]);

  // function modificarURL(tipoEntidad: string, valores: filtroEntidadesProps) {
  //   const queryStrings: string[] = [];
  //   if (valores.nombre) {
  //     queryStrings.push(`nombre=${valores.nombre}`);
  //   }
  //   queryStrings.push(`pagina=${valores.pagina}`);
  //   history.push(`/listado${tipoEntidad}?${queryStrings.join("&")}`);
  // }

  // function buscarEntidad(tipoEntidad: string, valores: filtroEntidadesProps) {
  //   modificarURL(tipoEntidad, valores);
  //   const data = services.filtrar(tipoEntidad, valores);
  //   data.then((respuesta: AxiosResponse<entidadModel[]>) => {
  //     const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
  //     setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

  //     setEntidades(respuesta.data);
  //   });
  // }

  return <></>;
}
interface buscarEntidadProps {}
