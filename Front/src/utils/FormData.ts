import { productoCrear } from "../Models/producto.model";

export function convertirProductoAFormData(producto: productoCrear): FormData {
    const formData = new FormData();

    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('cantidad',producto.precio.toString());
    formData.append('descripcion', JSON.stringify(producto.descripcion));
    formData.append('codigo', JSON.stringify(producto.codigo));
    formData.append('categoria', JSON.stringify(producto.categoria));
    if(producto.foto){
        formData.append('foto',producto.foto)
    }
    console.log(formData.get('nombre'))
    console.log(formData.get('precio'))

    return formData;
}