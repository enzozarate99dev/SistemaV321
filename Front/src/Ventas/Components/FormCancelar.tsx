import { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ventaCancelar, ventasModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormGroupText from "../../utils/FormGroupText";
import * as services from "../Services/ventas.services";
import * as Yup from 'yup'


export default function FormCancelar(props: formularioVentasProps) {

    const {id}: any = useParams()
    const [deuda, setDeuda] = useState<number>()

    useEffect(()=>{
        const res = services.getVenta(id)
        res.then((res:AxiosResponse<ventasModel>)=>{
            setDeuda(res.data.adeudada)
        })
    })

    

    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                pago: Yup.number().required("Este campo es requerido").max(deuda!)
            })}
        >
            {(formikProps) => (
                <Form>
                    <h3>Deuda a pagar: {deuda}</h3>
                    <FormGroupText campo="pago" label="Valor a pagar"/>
                    <Button disabled={formikProps.isSubmitting} type="submit" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        Guardar
                    </Button>
                    <Link style={{ marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }} className="btn btn-secondary" to="/">
                        Cancelar
                    </Link>
                </Form>
            )}
        </Formik>
    );
}

interface formularioVentasProps {
    modelo: ventaCancelar;
    onSubmit(
        valores: ventaCancelar,
        accion: FormikHelpers<ventaCancelar>
    ): void;
}