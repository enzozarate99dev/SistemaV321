import { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterIcon from "../../assets/FilterIcon";
import { productoModel } from "../../Models/producto.model";
import { ventasModel, ventasPostGetModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import Button from "../../utils/Button";
import FormGroupFecha from "../../utils/FormGroupFecha";
import Paginacion from "../../utils/Paginacion";
import * as servicesCF from "../../VentasConsFinal/Services/consumidorFinal.services";
import * as services from "../Services/ventas.services";
import ListadoVentas from "./ListadoVentas";

export default function FiltroVentas() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [productos, setProductos] = useState<productoModel[]>([]);
  const [ventas, setVentas] = useState<ventasModel[]>([]);
  const [ventasCF, setVentasCF] = useState<ventasConsumidorFinalModel[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
    console.log(flag);
  };

  const valorInicial: filtroVentasProps = {
    productoId: 0,
    fechaDeVenta: new Date(),
    consumidor: false,
    registrado: false,
    pagina: 1,
    recordsPorPagina: 10,
  };

  useEffect(() => {
    const res = services.getProductos();
    res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
      setProductos(respuesta.data.productos);
    });
  }, []);

  useEffect(() => {
    if (query.get("productoId")) {
      valorInicial.productoId = parseInt(query.get("productoId")!, 10);
    }
    if (query.get("registrado")) {
      valorInicial.registrado = true;
    }
    if (query.get("consumidor")) {
      valorInicial.consumidor = true;
    }
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 10);
    }
    buscarVenta(valorInicial);
    buscarVentaCF(valorInicial);
  }, [flag]);

  function modificarURL(valores: filtroVentasProps) {
    const queryStrings: string[] = [];
    if (valores.productoId) {
      queryStrings.push(`productoId=${valores.productoId}`);
    }
    if (valores.fechaDeVenta) {
      queryStrings.push(`fechaDeVenta=${valores.fechaDeVenta}`);
    }
    if (valores.registrado) {
      queryStrings.push(`registrado=${valores.registrado}`);
    }
    if (valores.consumidor) {
      queryStrings.push(`consumidor=${valores.consumidor}`);
    }
    queryStrings.push(`pagina=${valores.pagina}`);
    history.push(`/listadoVentas?${queryStrings.join("&")}`);
  }

  async function buscarVentaCF(valores: filtroVentasProps) {
    modificarURL(valores);
    const res = servicesCF.filtrar(valores);
    res.then((respuesta: AxiosResponse<ventasConsumidorFinalModel[]>) => {
      const totalDeRegistros = parseInt(
        respuesta.headers["cantidadtotalregistros"],
        10
      );
      setTotalDePaginas(
        Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina)
      );
      setVentasCF(respuesta.data);
    });
  }

  async function buscarVenta(valores: filtroVentasProps) {
    modificarURL(valores);
    const res = services.filtrar(valores);
    res.then((respuesta: AxiosResponse<ventasModel[]>) => {
      const totalDeRegistros = parseInt(
        respuesta.headers["cantidadtotalregistros"],
        10
      );
      setTotalDePaginas(
        Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina)
      );
      setVentas(respuesta.data);
    });
  }

  return (
    <>
      <ListadoVentas
        ventas={ventas}
        ventasConsFinal={ventasCF}
        setFlag={handleFlag}
      />
    </>
  );
}

export interface filtroVentasProps {
  productoId: number;
  fechaDeVenta: Date;
  consumidor: boolean;
  registrado: boolean;
  pagina: number;
  recordsPorPagina: number;
}
