import { Form, Input, Modal } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AddIcon from "../../assets/AddIcon";
import FilterIcon from "../../assets/FilterIcon";
import { clienteModel } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import FormGroupText from "../../utils/FormGroupText";
import Paginacion from "../../utils/Paginacion";
import * as services from "../Services/clientes.services";
import CargarCliente from "./CargarCliente";
import ListadoClientes from "./ListadoClientes";
import { Formik } from "formik";

export default function FiltroClientes() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [clientes, setClientes] = useState<clienteModel[]>([]);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
  };

  const valorInicial: filtroClientesProps = {
    nombreYApellido: "",
    pagina: 1,
    recordsPorPagina: 5,
  };

  useEffect(() => {
    if (query.get("nombreYApellido")) {
      valorInicial.nombreYApellido = query.get("nombreYApellido")!;
    }
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 5);
    }

    buscarCliente(valorInicial);
  }, [flag]);

  function modificarURL(valores: filtroClientesProps) {
    const queryStrings: string[] = [];
    if (valores.nombreYApellido) {
      queryStrings.push(`nombreYApellido=${valores.nombreYApellido}`);
    }
    queryStrings.push(`pagina=${valores.pagina}`);
    history.push(`/listadoClientes?${queryStrings.join("&")}`);
  }

  function buscarCliente(valores: filtroClientesProps) {
    modificarURL(valores);
    const data = services.filtrar(valores);
    data.then((respuesta: AxiosResponse<clienteModel[]>) => {
      const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10);
      setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

      setClientes(respuesta.data);
    });
  }

  return (
    <>
      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarCliente(valores);
        }}
      >
        {(formikProps) => (
          <>
            <ListadoClientes
              clientes={clientes}
              setFlag={handleFlag}
              buscador={
                <FormGroupText
                  onChange={() => formikProps.submitForm()}
                  campo="nombreYApellido"
                  placeholder="Buscar cliente"
                  style={{ width: 300, background: "#F8FAFC", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "4px" }}
                />
              }
            />
            <Paginacion
              cantidadTotalDePaginas={totalDePaginas}
              paginaActual={formikProps.values.pagina}
              onChange={(nuevaPagina) => {
                formikProps.values.pagina = nuevaPagina;
                buscarCliente(formikProps.values);
              }}
              data={clientes}
            />
          </>
        )}
      </Formik>
    </>
  );
}

export interface filtroClientesProps {
  nombreYApellido: string;
  pagina: number;
  recordsPorPagina: number;
}
