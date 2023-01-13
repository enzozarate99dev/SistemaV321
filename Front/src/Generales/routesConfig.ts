import Login from "../auth/Components/Login";
import FiltroClientes from "../Clientes/Components/FiltroClientes";
import ListadoClientes from "../Clientes/Components/ListadoClientes";
import FiltroCompras from "../Compras/Components/FiltroCompras";
import FiltroPresupuestos from "../Presupuestos/Components/FiltroPresupuestos";
import FiltroProductos from "../Productos/Components/FiltroProductos";
import FiltroProveedores from "../Proveedores/Components/FiltroProveedores";
import ListadoUsuarios from "../Usuarios/Components/ListadoUsuarios";
import Redireccionar from "../utils/Redireccionar";
import CancelarVenta from "../Ventas/Components/CancelarVenta";
import FiltroVentas from "../Ventas/Components/FiltroVentas";
import HomePage from "./HomePage";

const rutas = [
  {
    path: "/listadoProductos",
    componente: FiltroProductos,
    exact: true,
    esCajero: true,
  },

  {
    path: "/ventas/cancelar/:id(\\d+)",
    componente: CancelarVenta,
    exact: true,
    esCajero: true,
  },
  {
    path: "/listadoVentas",
    componente: FiltroVentas,
    exact: true,
    esCajero: true,
  },

  {
    path: "/listadoPresupuestos",
    componente: FiltroPresupuestos,
    exact: true,
    esCajero: true,
  },

  {
    path: "/listadoClientes",
    componente: ListadoClientes,
    exact: true,
    esCajero: true,
  },

  {
    path: "/listadoProveedores",
    componente: FiltroProveedores,
    exact: true,
    esCajero: true,
  },

  {
    path: "/listadoCompras",
    componente: FiltroCompras,
    exact: true,
    esCajero: true,
  },

  { path: "/login", componente: Login, exact: true },
  {
    path: "/listadoUsuarios",
    componente: ListadoUsuarios,
    exact: true,
    esAdmin: true,
  },

  { path: "/", componente: HomePage, exact: true, esAdmin: true },
  { path: "*", componente: Redireccionar },
];

export default rutas;
