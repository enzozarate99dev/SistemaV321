import axios, { AxiosResponse } from "axios";
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
import GenerarVentas from "./GenerarVentas";
import { urlProductos } from "../../Generales/endpoints";
import FormGroupText from "../../utils/FormGroupText";
import * as servicesProd from "../../Productos/Services/productos.services";
import ListadoVentas from "./ListadoVentas";

export default function FiltroVentas() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [productos, setProductos] = useState<productoModel[]>([]);
  const [ventas, setVentas] = useState<ventasModel[]>([]);
  const [ventasCF, setVentasCF] = useState<ventasConsumidorFinalModel[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
    console.log(flag);
  };
  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);

  // const valorInicial: filtroProductosProps = {
  //   nombre: "",
  //   precio: 0,
  //   codigo: "",
  //   stockDisponible: false,
  //   sinStock: false,
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
  // });

  // function modificarURL(valores: filtroProductosProps) {
  //   const queryStrings: string[] = [];
  //   if (valores.nombre) {
  //     queryStrings.push(`nombre=${valores.nombre}`);
  //   }
  //   queryStrings.push(`pagina=${valores.pagina}`);
  //   history.push(`/listadoVentas?${queryStrings.join("&")}`);
  // }

  // const buscarProducto = async (valores: filtroProductosProps) => {
  //   modificarURL(valores);
  //   const response = services.filtrar(valores);
  //   await response.then((respuesta: AxiosResponse<productoModel[]>) => {
  //     const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
  //     setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
  //     setProductos(respuesta.data);
  //   });
  // };
  // console.log(productos, "productos buscador");

  const valorInicial: filtroVentasProps = {
    productoId: 0,
    fechaDeVenta: new Date(),
    consumidor: false,
    registrado: false,
    pagina: 1,
    recordsPorPagina: 5,
    nombre: "",
    stockDisponible: false,
    sinStock: false,
  };

  // useEffect(() => {
  //   const res = axios.get(`${urlProductos}`);
  //   res.then((respuesta: AxiosResponse<productoModel[]>) => {
  //     setProductos(respuesta.data);
  //   });
  // }, []);

  useEffect(() => {
    // if (query.get("productoId")) {
    //   valorInicial.productoId = parseInt(query.get("productoId")!, 10);
    // }
    // if (query.get("registrado")) {
    //   valorInicial.registrado = true;
    // }
    // if (query.get("consumidor")) {
    //   valorInicial.consumidor = true;
    // }
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 10);
    }
    buscarVenta(valorInicial);
  }, [flag]);

  function modificarURL(valores: filtroVentasProps) {
    const queryStrings: string[] = [];
    // if (valores.productoId) {
    //   queryStrings.push(`productoId=${valores.productoId}`);
    // }
    // if (valores.fechaDeVenta) {
    //   queryStrings.push(`fechaDeVenta=${valores.fechaDeVenta}`);
    // }
    // if (valores.registrado) {
    //   queryStrings.push(`registrado=${valores.registrado}`);
    // }
    // if (valores.consumidor) {
    //   queryStrings.push(`consumidor=${valores.consumidor}`);
    // }
    queryStrings.push(`pagina=${valores.pagina}`);
    history.push(`/listadoVentas?${queryStrings.join("&")}`);
  }

  async function buscarVenta(valores: filtroVentasProps) {
    // modificarURL(valores);
    const res = services.filtrar(valores);
    res.then((respuesta: AxiosResponse<ventasModel[]>) => {
      const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
      setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
      setVentas(respuesta.data);
    });
  }
  console.log(ventas);

  return (
    <>
      {/* <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarProducto(valores);
        }}
      >
        {(formikProps) => (
          <>
            <GenerarVentas
              ventas={ventas}
              ventasConsFinal={ventasCF}
              setFlag={handleFlag}
              productos={productos}
              buscador={
                <Form>
                  <div className="form-inline">
                    <FormGroupText onChange={() => formikProps.submitForm()} campo="nombre" placeholder="Cargar articulo" />
                  </div>
                </Form>
              }
              paginacion={
                <Paginacion
                  cantidadTotalDePaginas={totalDePaginas}
                  paginaActual={formikProps.values.pagina}
                  onChange={(nuevaPagina) => {
                    formikProps.values.pagina = nuevaPagina;
                    buscarProducto(formikProps.values);
                  }}
                />
              }
            />
          </>
        )}
      </Formik> */}
      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarVenta(valores);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="form-inline">
                {/* <FormGroupText onChange={() => formikProps.submitForm()} campo="nombre" placeholder="Buscar venta" /> */}
              </div>
            </Form>

            <ListadoVentas ventas={ventas} setFlag={handleFlag}></ListadoVentas>

            <Paginacion
              cantidadTotalDePaginas={totalDePaginas}
              paginaActual={formikProps.values.pagina}
              onChange={(nuevaPagina) => {
                formikProps.values.pagina = nuevaPagina;
                buscarVenta(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
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
  nombre: string;
  stockDisponible: boolean;
  sinStock: boolean;
}
export interface filtroProductosProps {
  nombre: string;
  codigo: string;
  precio?: number;
  stockDisponible: boolean;
  sinStock: boolean;
  pagina: number;
  recordsPorPagina: number;
}
