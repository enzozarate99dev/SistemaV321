import { Field, FormikProps } from "formik";
import { productoModel } from "../../Models/producto.model";
import { presupuestoProps, valoresPrevProps } from "./Presupuesto";

export default function NuevoProductoPresupuesto(props: propsNuevoProducto) {

    return (
        <div style={{marginTop:'-1px'}} className="row g-3">
            <div className="col md-4">
                <select className="form-control" {...props.formikProps.getFieldProps(`productosIds`)}>
                    <option value="0">--Seleccione un producto--</option>
                    {props.productosDisp.map(producto =>
                        <option key={producto.id} value={producto.id}>{producto.nombre}--${producto.precio}</option>)}
                </select>
            </div>
            <div className="col md-4">
                <Field name='cantidad' className="form-control" />
            </div>
        </div>
    )
}

interface propsNuevoProducto {
    formikProps: FormikProps<valoresPrevProps>;
    productosDisp: productoModel[]
}
