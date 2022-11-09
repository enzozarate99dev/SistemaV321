import { Field, FormikProps } from "formik";
import { productoModel } from "../../Models/producto.model";
import { presupuestoProps } from "./Presupuesto";

export default function NuevoProductoPresupuesto(props: propsNuevoProducto) {

    return (
        <div className="form-group mx-sm-3 mb-2">
            <select className="form-control" {...props.formikProps.getFieldProps(`productosIds[${props.index}]`)}>
                <option value="0">--Seleccione un producto--</option>
                {props.productosDisp.map(producto =>
                    <option key={producto.id} value={producto.id}>{producto.nombre}--${producto.precio}--Unidades restantes {producto.cantidad}</option>)}
            </select>
            <Field name={`cantidad[${props.index}]`} className="form-control" />
        </div>
    )
}

interface propsNuevoProducto {
    formikProps: FormikProps<presupuestoProps>;
    productosDisp: productoModel[]
    index: number
}
