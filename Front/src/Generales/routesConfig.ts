import Login from "../auth/Components/Login";
import CargarCliente from "../Clientes/Components/CargarCliente";
import EditarCliente from "../Clientes/Components/EditarCliente";
import FiltroClientes from "../Clientes/Components/FiltroClientes";
import InfoCliente from "../Clientes/Components/InfoCliente";
import Compras from "../Compras/Components/Compras";
import DetalleCompras from "../Compras/Components/DetalleCompras";
import FiltroCompras from "../Compras/Components/FiltroCompras";
import EditarPresupuesto from "../Presupuestos/Components/EditarPresupuesto";
import FiltroPresupuestos from "../Presupuestos/Components/FiltroPresupuestos";
import Presupuesto from "../Presupuestos/Components/Presupuesto";
import CargarProducto from "../Productos/Components/CargarProducto";
import EditarProducto from "../Productos/Components/EditarProducto";
import FiltroProductos from "../Productos/Components/FiltroProductos";
import CargarProveedor from "../Proveedores/Components/CargarProveedor";
import EditarProveedor from "../Proveedores/Components/EditarProveedor";
import FiltroProveedores from "../Proveedores/Components/FiltroProveedores";
import ListadoUsuarios from "../Usuarios/Components/ListadoUsuarios";
import Usuarios from "../Usuarios/Components/Usuarios";
import Redireccionar from "../utils/Redireccionar";
import CancelarVenta from "../Ventas/Components/CancelarVenta";
import ClientesDisponibles from "../Ventas/Components/ClientesDisponibles";
import DetalleVentas from "../Ventas/Components/DetalleVentas";
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
    {path: '/ventas/:id(\\d+)', componente: Ventas, exact: true, esCajero:true},
    {path: '/ventas/cancelar/:id(\\d+)', componente: CancelarVenta, exact: true, esCajero:true},
    {path: '/listadoVentas', componente: FiltroVentas, exact: true, esCajero:true},
    {path: '/ventas/detalle/:id(\\d+)', componente: DetalleVentas, exact: true, esCajero:true},

    {path: '/ventasConsumidorFinal', componente: ConsumidorFinal, exact: true, esCajero:true},
    {path: '/ventasConsumidorFinal/:id(\\d+)', componente: DetalleVentasCF, exact: true, esCajero:true}, 
    
    {path: '/ventas/presupuesto', componente: Presupuesto, exact: true, esCajero:true},
    {path: '/listadoPresupuestos', componente: FiltroPresupuestos, exact: true, esCajero:true},
    {path: '/presupuesto/editar/:id(\\d+)', componente: EditarPresupuesto, exact: true, esCajero:true},

    {path: '/clientes', componente: CargarCliente, exact: true, esCajero:true},
    {path: '/listadoClientes', componente: FiltroClientes, exact: true, esCajero:true},
    {path: '/clientes/editar/:id(\\d+)', componente: EditarCliente, exact: true, esCajero:true},
    {path: '/clientes/:id(\\d+)', componente: InfoCliente, exact: true, esCajero:true},
    
    {path: '/proveedores', componente: CargarProveedor, exact: true, esCajero:true},
    {path: '/listadoProveedores', componente: FiltroProveedores, exact: true, esCajero:true},
    {path: '/proveedores/editar/:id(\\d+)', componente: EditarProveedor, exact: true, esCajero:true},

    {path: '/compras', componente: Compras, exact: true, esCajero:true},
    {path: '/listadoCompras', componente: FiltroCompras, exact: true, esCajero:true},
    {path: '/compras/detalle/:id(\\d+)', componente: DetalleCompras, exact: true, esCajero:true},

    {path: '/login', componente: Login, exact: true},
    {path: '/registro', componente: Usuarios, exact: true, esAdmin:true},
    {path: '/listadoUsuarios', componente: ListadoUsuarios, exact: true, esAdmin:true},
    

    {path: '*', componente: Redireccionar}
]

export default rutas;