import axios from "axios";
import { urlProductos } from "../../Generales/endpoints";
import { actualizar, productoCrear } from "../../Models/producto.model";
import { convertirProductoAFormData } from "../../utils/FormData";
import { filtroProductosProps } from "../Components/FiltroProductos";

export async function crear(producto: productoCrear) {
  const formData = convertirProductoAFormData(producto);
  await axios({
    method: "post",
    url: urlProductos,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function editar(productoEditar: productoCrear, id: number) {
  const formData = convertirProductoAFormData(productoEditar);
  await axios({
    method: "put",
    url: `${urlProductos}/${id}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  // await axios.put(`${urlProductos}/${id}`, productoEditar);
}

export async function borrar(id: number) {
  await axios.delete(`${urlProductos}/${id}`);
}

export async function actualizarF(valores: actualizar) {
  await axios.put(`${urlProductos}/actualizar`, valores);
}

export async function getProductos(id: any) {
  const response = axios.get(`${urlProductos}/${id}`);
  return response;
}

export async function filtrar(valores: filtroProductosProps) {
  const response = axios.get(`${urlProductos}/filtrar`, { params: valores });
  return response;
}
