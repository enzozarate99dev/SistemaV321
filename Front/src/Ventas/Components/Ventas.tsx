import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { productoModel } from "../../Models/producto.model";
import GenerarVentas from "./GenerarVentas";
import FormGroupText from "../../utils/FormGroupText";
import Paginacion from "../../utils/Paginacion";
import * as servicesProd from "../../Productos/Services/productos.services";

export default function Ventas() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [productos, setProductos] = useState<productoModel[]>([]);
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
    console.log(flag);
  };
  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);

  const valorInicial: filtroProductosProps = {
    nombre: "",
    precio: 0,
    codigo: "",
    stockDisponible: false,
    sinStock: false,
    pagina: 1,
    recordsPorPagina: 5,
    sucursalId: 1,
  };

  useEffect(() => {
    if (query.get("nombre")) {
      valorInicial.nombre = query.get("nombre")!;
    }
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 5);
    }
  });

  function modificarURL(valores: filtroProductosProps) {
    const queryStrings: string[] = [];
    if (valores.nombre) {
      queryStrings.push(`nombre=${valores.nombre}`);
    }
    queryStrings.push(`pagina=${valores.pagina}`);
    history.push(`/ventas/generar/?${queryStrings.join("&")}`);
  }

  const buscarProducto = async (valores: filtroProductosProps) => {
    modificarURL(valores);
    const response = servicesProd.filtrar(valores);
    await response.then((respuesta: AxiosResponse<productoModel[]>) => {
      const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
      setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
      // Filtrar los productos por las primeras tres letras del nombre
      const productosFiltrados = respuesta.data.filter((producto) => {
        const nombre = producto.nombre.toLowerCase();
        const filtro = valores.nombre.toLowerCase().slice(0, 3);
        return nombre.indexOf(filtro) === 0;
      });

      setProductos(valores.nombre === "" ? [] : productosFiltrados);
      // setProductos(respuesta.data);
    });
  };

  return (
    <>
      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarProducto(valores);
        }}
      >
        {(formikProps) => (
          <>
            <GenerarVentas
              // ventas={ventas}
              // ventasConsFinal={ventasCF}
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
      </Formik>
    </>
  );
}
interface filtroProductosProps {
  nombre: string;
  codigo: string;
  precio?: number;
  stockDisponible: boolean;
  sinStock: boolean;
  pagina: number;
  recordsPorPagina: number;
  sucursalId: number;
}
// interface crearVentaProps {
//   setFlagModal: () => void;
//   setFlagListado: () => void;
// }
