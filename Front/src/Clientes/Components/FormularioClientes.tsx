import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { clienteCrear } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";

export default function FormularioClientes(props: formularioClientesProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        nombreYApellido: Yup.string().required("Este campo es requerido").max(100, "La longitud maxima es de 100"),
        nroIngresos: Yup.string().required("Este campo es requerido"),
        domicilio: Yup.string().required("Este campo es requerido"),
        codigoPostal: Yup.string().required("Este campo es requerido"),
        provincia: Yup.string().required("Este campo es requerido"),
        localidad: Yup.string().required("Este campo es requerido"),
        nroDocumento: Yup.string().required("Este campo es requerido"),
        razonSocial: Yup.string().required("Este campo es requerido"),
      })}
    >
      {(formikProps) => (
        <Form style={{ marginTop: "-1px", backgroundColor: "#D9D9D9" }} className="row g-3 needs-validation" noValidate>
          <div className="col-md-4">
            <FormGroupText campo="nroDocumento" label="Numero de documento" placeholder="Numero de documento" />
          </div>
          <div className="col-md-4">
            <FormGroupText campo="nombreYApellido" label="Nombre Y Apellido" placeholder="Nombre del cliente" />
          </div>
          <div className="col-md-4">
            <FormGroupText campo="razonSocial" label="Razon Social" placeholder="Razon Social" />
          </div>
          <div className="col-md-4">
            <FormGroupText campo="domicilio" label="Domicilio" placeholder="Domicilio" />
          </div>
          <div className="col-md-4">
            <FormGroupText campo="localidad" label="Localidad" placeholder="Localidad" />
          </div>
          <div className="col-md-4">
            <FormGroupText campo="provincia" label="Provincia" placeholder="Provincia" />
          </div>
          <div className="col-md-4">
            <FormGroupText campo="codigoPostal" label="Codigo Postal" placeholder="Codigo Postal" />
          </div>
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              marginInline: "20vw",
            }}
          >
            <div className="col-md-4 container">
              <FormGroupCheckbox campo="percibeIIBB" label="Percibe IIBB" onChange={() => {}} />

              <FormGroupCheckbox campo="percibeIVA" label="Percibe IVA" />
            </div>

            <div className="col-md-6">
              <FormGroupText campo="nroIngresos" label="Numero" placeholder="Numero" />
            </div>
          </div>
          {props.buttonExiste ? (
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                disabled={formikProps.isSubmitting}
                style={{ backgroundColor: "#D9D9D9", borderColor: "#36D643", color: "#424242" }}
              >
                {props.buttonText}
              </Button>
            </div>
          ) : null}

          {/* <div className="col-md-4">
            <label htmlFor="tipoDocumento">Tipo de Documento</label>
            <Field className="form-control" as="select" name="tipoDocumento">
              <option value={0}>Seleccionar tipo de documento</option>
              <option value={1}>DNI</option>
              <option value={5}>Pasaporte</option>
              <option value={6}>CUIT</option>
              <option value={7}>CUIL</option>
            </Field>
          </div> */}
        </Form>
      )}
    </Formik>
  );
}

interface formularioClientesProps {
  modelo: clienteCrear;
  onSubmit(valores: clienteCrear, accion: FormikHelpers<clienteCrear>): void;
  setBandera?: () => void;
  buttonText?: string;
  buttonExiste: boolean;
}
