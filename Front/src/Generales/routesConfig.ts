import Login from "../auth/Components/Login";
import CargarCliente from "../Clientes/Components/CargarCliente";
import EditarCliente from "../Clientes/Components/EditarCliente";
import FiltroClientes from "../Clientes/Components/FiltroClientes";
import InfoCliente from "../Clientes/Components/InfoCliente";
import FiltroPresupuestos from "../Presupuestos/Components/FiltroPresupuestos";
import Presupuesto from "../Presupuestos/Components/Presupuesto";
import CargarProducto from "../Productos/Components/CargarProducto";
import EditarProducto from "../Productos/Components/EditarProducto";
import FiltroProductos from "../Productos/Components/FiltroProductos";
import ListadoUsuarios from "../Usuarios/Components/ListadoUsuarios";
import Usuarios from "../Usuarios/Components/Usuarios";
import Redireccionar from "../utils/Redireccionar";
import CancelarVenta from "../Ventas/Components/CancelarVenta";
import ClientesDisponibles from "../Ventas/Components/ClientesDisponibles";
import DetalleVentas from "../Ventas/Components/DetalleVentas";
import EditorVentas from "../Ventas/Components/EditorVentas";
import FiltroVentas from "../Ventas/Components/FiltroVentas";
import Redirigir from "../Ventas/Components/Redirigir";
import Ventas from "../Ventas/Components/Ventas";
import ConsumidorFinal from "../VentasConsFinal/Components/ConsumidorFinal";
import DetalleVentasCF from "../VentasConsFinal/Components/DetalleVentasCF";


const rutas = [
    {path: '/listadoProductos', componente: FiltroProductos, exact: true, esCajero:true},
    {path: '/productos/cargar', componente: CargarProducto, exact: true, esCajero:true},
    {path: '/productos/editar/:id(\\d+)', componente: EditarProducto, exact: true, esCajero:true},

    {path: '/redirigirVentas', componente: Redirigir, exact: true, esCajero:true},
    {path: '/ventas', componente: ClientesDisponibles, exact: true, esCajero:true},
    {path: '/ventasConsumidorFinal', componente: ConsumidorFinal, exact: true, esCajero:true},
    {path: '/ventasConsumidorFinal/:id(\\d+)', componente: DetalleVentasCF, exact: true, esCajero:true},
    {path: '/ventas/:id(\\d+)', componente: Ventas, exact: true, esCajero:true},
    {path: '/ventas/editar/:id(\\d+)', componente: EditorVentas, exact: true, esCajero:true},
    {path: '/ventas/cancelar/:id(\\d+)', componente: CancelarVenta, exact: true, esCajero:true},
    {path: '/listadoVentas', componente: FiltroVentas, exact: true, esCajero:true},
    {path: '/ventas/detalle/:id(\\d+)', componente: DetalleVentas, exact: true, esCajero:true},

    {path: '/ventas/presupuesto', componente: Presupuesto, exact: true, esCajero:true},
    {path: '/listadoPresupuestos', componente: FiltroPresupuestos, exact: true, esCajero:true},

    {path: '/clientes', componente: CargarCliente, exact: true, esCajero:true},
    {path: '/listadoClientes', componente: FiltroClientes, exact: true, esCajero:true},
    {path: '/clientes/editar/:id(\\d+)', componente: EditarCliente, exact: true, esCajero:true},
    {path: '/clientes/:id(\\d+)', componente: InfoCliente, exact: true, esCajero:true},

    {path: '/login', componente: Login, exact: true},
    {path: '/registro', componente: Usuarios, exact: true, esAdmin:true},
    {path: '/listadoUsuarios', componente: ListadoUsuarios, exact: true, esAdmin:true},
    

    {path: '*', componente: Redireccionar}
]

export default rutas;