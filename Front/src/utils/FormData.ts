import { productoCrear } from "../Models/producto.model";

export function convertirProductoAFormData(producto: productoCrear): FormData {
    const formData = new FormData();

    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('cantidad',producto.cantidad.toString());
    formData.append('descripcion', producto.descripcion!.toString());
    formData.append('codigo', producto.codigo!.toString());
    formData.append('categoria', producto.categoria!.toString());
    if(producto.foto){
        formData.append('foto',producto.foto)
    }

    return formData;
}