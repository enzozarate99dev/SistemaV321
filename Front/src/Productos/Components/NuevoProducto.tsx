import { Field, FormikProps } from "formik";
import { productoModel } from "../../Models/producto.model";
import { ventasCrear } from "../../Models/ventas.model";

export default function NuevoProducto(props: propsNuevoProducto) {

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
    formikProps: FormikProps<ventasCrear>;
    productosDisp: productoModel[]
    index: number
}
