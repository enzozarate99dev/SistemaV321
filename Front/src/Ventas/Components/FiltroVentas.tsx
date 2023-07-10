import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ventasModel } from "../../Models/ventas.model";
import Paginacion from "../../utils/Paginacion";
import * as services from "../Services/ventas.services";
import * as servicesCliente from "../../Clientes/Services/clientes.services";
import ListadoVentas from "./ListadoVentas";
import AutenticacionContext from "../../auth/AutenticacionContext";

export default function FiltroVentas() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [ventas, setVentas] = useState<ventasModel[]>([]);
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
  };

  const query = new URLSearchParams(useLocation().search);
  const { sucursalId } = useContext(AutenticacionContext);

  const valorInicial: filtroVentasProps = {
    productoId: 0,
    fechaDeVenta: new Date(),
    consumidor: false,
    registrado: false,
    pagina: 1,
    recordsPorPagina: 10,
    nombre: "",
    stockDisponible: false,
    sinStock: false,
    sucursalId: sucursalId,
  };

  useEffect(() => {
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 10);
    }
    buscarVenta(valorInicial);
  }, [flag]);

  async function buscarVenta(valores: filtroVentasProps) {
    const res = services.filtrar(valores);
    res.then((respuesta: AxiosResponse<ventasModel[]>) => {
      const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
      setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

      setVentas(respuesta.data);
    });
  }
  return (
    <>
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
              <div className="form-inline"></div>
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
  sucursalId: number;
}
export interface filtroProductosProps {
  nombre: string;
  codigo: string;
  precio?: number;
  stockDisponible: boolean;
  sinStock: boolean;
  pagina: number;
  sucursalId: number;
  recordsPorPagina: number;
}
