import Login from "../auth/Components/Login";
import Registro from "../Usuarios/Components/Registro";
import CargarCliente from "../Clientes/Components/CargarCliente";
import EditarCliente from "../Clientes/Components/EditarCliente";
import FiltroClientes from "../Clientes/Components/FiltroClientes";
import InfoCliente from "../Clientes/Components/InfoCliente";
import FiltroPresupuestos from "../Presupuestos/Components/FiltroPresupuestos";
import Presupuesto from "../Presupuestos/Components/Presupuesto";
import CargarProducto from "../Productos/Components/CargarProducto";
import EditarProducto from "../Productos/Components/EditarProducto";
import FiltroProductos from "../Productos/Components/FiltroProductos";
import Redireccionar from "../utils/Redireccionar";
import CancelarVenta from "../Ventas/Components/CancelarVenta";
import CargarVentas from "../Ventas/Components/CargarVentas";
import ClientesDisponibles from "../Ventas/Components/ClientesDisponibles";
import DetalleVentas from "../Ventas/Components/DetalleVentas";
import EditarVenta from "../Ventas/Components/EditarVenta";
import FiltroVentas from "../Ventas/Components/FiltroVentas";
import Redirigir from "../Ventas/Components/Redirigir";
import CargarVentaCF from "../VentasConsFinal/Components/CargarVentaCF";
import ListadoUsuarios from "../Usuarios/Components/ListadoUsuarios";


const rutas = [
    {path: '/listadoProductos', componente: FiltroProductos, exact: true},
    {path: '/productos/cargar', componente: CargarProducto, exact: true},
    {path: '/productos/editar/:id(\\d+)', componente: EditarProducto, exact: true},

    {path: '/redirigirVentas', componente: Redirigir, exact: true},
    {path: '/ventas', componente: ClientesDisponibles, exact: true},
    {path: '/ventasConsumidorFinal', componente: CargarVentaCF, exact: true},
    {path: '/ventas/:id(\\d+)', componente: CargarVentas, exact: true},
    {path: '/ventas/editar/:id(\\d+)', componente: EditarVenta, exact: true},
    {path: '/ventas/cancelar/:id(\\d+)', componente: CancelarVenta, exact: true},
    {path: '/listadoVentas', componente: FiltroVentas, exact: true},
    {path: '/ventas/detalle/:id(\\d+)', componente: DetalleVentas, exact: true},

    {path: '/ventas/presupuesto', componente: Presupuesto, exact: true},
    {path: '/listadoPresupuestos', componente: FiltroPresupuestos, exact: true},

    {path: '/clientes', componente: CargarCliente, exact: true},
    {path: '/listadoClientes', componente: FiltroClientes, exact: true},
    {path: '/clientes/editar/:id(\\d+)', componente: EditarCliente, exact: true},
    {path: '/clientes/:id(\\d+)', componente: InfoCliente, exact: true},

    {path: '/login', componente: Login, exact: true},
    {path: '/registro', componente: Registro, exact: true},
    {path: '/listadoUsuarios', componente: ListadoUsuarios, exact: true},
    

    {path: '*', componente: Redireccionar}
]

export default rutas;