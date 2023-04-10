import { useState } from "react";

export default function Paginaciones({ items }: paginacionesProps) {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);

  // const clientesFiltrados = () => {
  //   if (busqueda.length === 0) return items.slice(paginaActual, paginaActual + 5);

  //   const filtrarClientes = items.filter((cliente) => cliente.nombreYApellido.toLowerCase().includes(busqueda.toLowerCase()));
  //   return filtrarClientes.slice(paginaActual, paginaActual + 6);
  // };

  // const nextPage = () => {
  //   if (items.filter((cliente) => cliente.nombreYApellido.includes(busqueda)).length > paginaActual + 5)
  //     setPaginaActual(paginaActual + 5);
  // };

  const prevPage = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 5);
    }
  };

  const cambiosBusqueda = (e: any) => {
    setPaginaActual(0);
    setBusqueda(e.target.value);
  };
  return <></>;
}
interface paginacionesProps {
  items: [];
}
