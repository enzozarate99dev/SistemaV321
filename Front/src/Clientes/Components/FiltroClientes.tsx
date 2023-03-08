import { Modal } from "antd";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
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

export default function FiltroClientes() {
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [clientes, setClientes] = useState<clienteModel[]>([]);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
    console.log(flag);
  };

  const valorInicial: filtroClientesProps = {
    nombreYApellido: "",
    pagina: 1,
    recordsPorPagina: 10,
  };

  useEffect(() => {
    if (query.get("nombreYApellido")) {
      valorInicial.nombreYApellido = query.get("nombreYApellido")!;
    }
    if (query.get("pagina")) {
      valorInicial.pagina = parseInt(query.get("pagina")!, 10);
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
      console.log(respuesta);
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
            <Form>
              {mostrarFiltros ? (
                <div className="form-inline">
                  <div className="form-group mb-2">
                    <FormGroupText onChange={() => formikProps.submitForm()} campo="nombreYApellido" placeholder="Nombre del cliente" />
                  </div>
                  <Button
                    className="btn btn-danger mb-2"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      formikProps.setValues(valorInicial);
                      buscarCliente(valorInicial);
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              ) : null}
            </Form>

            <ListadoClientes clientes={clientes} setFlag={handleFlag} />
            {/* <Paginacion
              cantidadTotalDePaginas={totalDePaginas}
              paginaActual={formikProps.values.pagina}
              onChange={(nuevaPagina) => {
                formikProps.values.pagina = nuevaPagina;
                buscarCliente(formikProps.values);
              }}
            /> */}
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
