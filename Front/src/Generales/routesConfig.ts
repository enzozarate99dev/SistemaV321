import CargarCliente from "../Clientes/CargarCliente";
import EditarCliente from "../Clientes/EditarCliente";
import FiltroClientes from "../Clientes/FiltroClientes";
import InfoCliente from "../Clientes/InfoCliente";
import CargarProducto from "../Productos/CargarProducto";
import EditarProducto from "../Productos/EditarProducto";
import FiltroProductos from "../Productos/FiltroProductos";
import Redireccionar from "../utils/Redireccionar";
import CargarVentas from "../Ventas/CargarVentas";
import DetalleVentas from "../Ventas/DetalleVentas";
import EditarVenta from "../Ventas/EditarVenta";
import FiltroVentas from "../Ventas/FiltroVentas";


const rutas = [
    {path: '/', componente: FiltroProductos, exact: true},
    {path: '/productos/cargar', componente: CargarProducto, exact: true},
    {path: '/productos/editar/:id(\\d+)', componente: EditarProducto, exact: true},

    {path: '/ventas', componente: CargarVentas, exact: true},
    {path: '/ventas/editar/:id(\\d+)', componente: EditarVenta, exact: true},
    {path: '/listadoVentas', componente: FiltroVentas, exact: true},
    {path: '/ventas/:id(\\d+)', componente: DetalleVentas, exact: true},

    {path: '/clientes', componente: CargarCliente, exact: true},
    {path: '/listadoClientes', componente: FiltroClientes, exact: true},
    {path: '/clientes/editar/:id(\\d+)', componente: EditarCliente, exact: true},
    {path: '/clientes/:id(\\d+)', componente: InfoCliente, exact: true},
    

    {path: '*', componente: Redireccionar}
]

export default rutas;