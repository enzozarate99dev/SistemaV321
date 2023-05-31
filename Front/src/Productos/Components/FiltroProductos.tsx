import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import FormGroupText from "../../utils/FormGroupText";
import Paginacion from "../../utils/Paginacion";
import * as services from "../Services/productos.services";
import "../styles.css";
import ListadoProductos from "./ListadoProductos";
import AutenticacionContext from "../../auth/AutenticacionContext";

export default function FiltroProductos() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [productos, setProductos] = useState<productoModel[]>([]);
  // const [mostrarFiltros, setMostrarFiltros] = useState(true);
  const [flag, setFlag] = useState(false);

  const cambiarFlag = () => {
    setFlag(!flag);
  };

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const { sucursalId } = useContext(AutenticacionContext);

  const valorInicial: filtroProductosProps = {
    nombre: "",
    precio: 0,
    codigo: "",
    stockDisponible: false,
    sinStock: false,
    pagina: 1,
    recordsPorPagina: 5,
    sucursalId: sucursalId,
  };

  useEffect(() => {
    if (query.get("nombre")) {
      valorInicial.nombre = query.get("nombre")!;
    }
    if (query.get("codigo")) {
      valorInicial.codigo = query.get("codigo")!;
    }
    // if (query.get("stockDisponible")) {
    //   valorInicial.stockDisponible = true;
    // }
    // if (query.get("sinStock")) {
    //   valorInicial.sinStock = true;
    // }
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 10);
    }

    buscarProducto(valorInicial);
  }, [flag]);

  function modificarURL(valores: filtroProductosProps) {
    const queryStrings: string[] = [];
    if (valores.nombre) {
      queryStrings.push(`nombre=${valores.nombre}`);
    }
    if (valores.codigo) {
      queryStrings.push(`codigo=${valores.codigo}`);
    }
    // if (valores.stockDisponible) {
    //   queryStrings.push(`stockDisponible=${valores.stockDisponible}`);
    // }
    // if (valores.sinStock) {
    //   queryStrings.push(`sinStock=${valores.sinStock}`);
    // }

    queryStrings.push(`pagina=${valores.pagina}`);
    history.push(`/listadoProductos?${queryStrings.join("&")}`);
  }

  const buscarProducto = async (valores: filtroProductosProps) => {
    modificarURL(valores);
    const response = services.filtrar(valores);
    await response.then((respuesta: AxiosResponse<productoModel[]>) => {
      const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
      setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
      setProductos(respuesta.data);
      console.log(respuesta.data);
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
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group  ">
                  <FormGroupText
                    style={{ background: "#F8FAFC", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginInline: "1rem" }}
                    onChange={() => formikProps.submitForm()}
                    campo="nombre"
                    placeholder="Buscar por nombre"
                  />
                  <FormGroupText
                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginInline: "1rem" }}
                    onChange={() => formikProps.submitForm()}
                    campo="codigo"
                    placeholder="Buscar por codigo"
                  />
                </div>
              </div>
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

export interface filtroProductosProps {
  nombre: string;
  codigo: string;
  precio?: number;
  stockDisponible: boolean;
  sinStock: boolean;
  pagina: number;
  recordsPorPagina: number;
  sucursalId: number;
}
