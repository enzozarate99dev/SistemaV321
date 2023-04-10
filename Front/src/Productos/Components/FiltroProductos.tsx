import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterIcon from "../../assets/FilterIcon";
import { productoModel } from "../../Models/producto.model";
import Button from "../../utils/Button";
import FormGroupText from "../../utils/FormGroupText";
import Paginacion from "../../utils/Paginacion";
import * as services from "../Services/productos.services";
import "../styles.css";
import ListadoProductos from "./ListadoProductos";
import { urlProductos } from "../../Generales/endpoints";

export default function FiltroProductos() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [productos, setProductos] = useState<productoModel[]>();
  const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [flag, setFlag] = useState(false);

  const cambiarFlag = () => {
    setFlag(!flag);
  };

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const valorInicial: filtroVentasProps = {
    nombre: "",
    precio: 0,
    stockDisponible: false,
    sinStock: false,
    pagina: 1,
    recordsPorPagina: 10,
  };

  useEffect(() => {
    if (query.get("nombre")) {
      valorInicial.nombre = query.get("nombre")!;
    }
    if (query.get("precio")) {
      valorInicial.precio = parseInt(query.get("precio")!, 10);
    }
    if (query.get("stockDisponible")) {
      valorInicial.stockDisponible = true;
    }
    if (query.get("sinStock")) {
      valorInicial.sinStock = true;
    }

    buscarProducto(valorInicial);
  }, [flag]);

  function modificarURL(valores: filtroVentasProps) {
    const queryStrings: string[] = [];
    if (valores.nombre) {
      queryStrings.push(`nombre=${valores.nombre}`);
    }
    if (valores.precio) {
      queryStrings.push(`precio=${valores.precio}`);
    }
    if (valores.stockDisponible) {
      queryStrings.push(`stockDisponible=${valores.stockDisponible}`);
    }
    if (valores.sinStock) {
      queryStrings.push(`sinStock=${valores.sinStock}`);
    }

    queryStrings.push(`pagina=${valores.pagina}`);
    history.push(`/listadoProductos?${queryStrings.join("&")}`);
  }

  const buscarProducto = async (valores: filtroVentasProps) => {
    modificarURL(valores);
    const response = services.filtrar(valores);
    await response.then((respuesta: AxiosResponse<productoModel[]>) => {
      const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"] || "10", 10);
      setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
      setProductos(respuesta.data);
      console.log(respuesta.headers);
    });
  };
  return (
    <>
      <h3 style={{ marginTop: "1rem" }}>Administrar Productos</h3>
      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarProducto(valores);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              {/* <Button
                style={{ marginBottom: "1rem" }}
                onClick={() => {
                  setMostrarFiltros(!mostrarFiltros);
                }}
                className="btn btn-secondary"
              >
                <FilterIcon />
              </Button> */}

              {mostrarFiltros ? (
                <div className="form-inline">
                  <div className="form-group mb-2">
                    <FormGroupText onChange={() => formikProps.submitForm()} campo="nombre" placeholder="Nombre del producto" />
                  </div>
                  <div className="form-group mb-2" style={{ marginLeft: "5px" }}>
                    <FormGroupText onChange={() => formikProps.submitForm()} campo="precio" placeholder="Precio maximo" />
                  </div>
                  <div className="form-group mx-sm-3 mb-2">
                    <Field
                      onClick={() => formikProps.submitForm()}
                      className="form-check-input"
                      id="stockDisponible"
                      name="stockDisponible"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="stockDisponible">
                      Stock Disponible
                    </label>
                  </div>
                  <div className="form-group mx-sm-3 mb-2">
                    <Field
                      onClick={() => formikProps.submitForm()}
                      className="form-check-input"
                      id="sinStock"
                      name="sinStock"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="sinStock">
                      Sin Stock
                    </label>
                  </div>
                  <Button
                    style={{ marginLeft: "5px" }}
                    className="btn btn-danger mb-2"
                    onClick={() => {
                      formikProps.setValues(valorInicial);
                      buscarProducto(valorInicial);
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              ) : null}
            </Form>

            <ListadoProductos productos={productos} setFlag={cambiarFlag} />

            <Paginacion
              cantidadTotalDePaginas={totalDePaginas}
              paginaActual={formikProps.values.pagina}
              onChange={(nuevaPagina) => {
                formikProps.values.pagina = nuevaPagina;
                buscarProducto(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

export interface filtroVentasProps {
  nombre: string;
  precio?: number;
  stockDisponible: boolean;
  sinStock: boolean;
  pagina: number;
  recordsPorPagina: number;
}
