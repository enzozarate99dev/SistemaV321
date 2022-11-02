import { NavLink } from "react-router-dom";


export default function Menu() {
    const claseActiva = "active";
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" activeClassName={claseActiva}>Listado de productos</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="navbar-brand" activeClassName={claseActiva} to="/listadoClientes">
                                Listado Clientes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="navbar-brand" activeClassName={claseActiva} to="/listadoVentas">
                                Listado Ventas
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <NavLink className="navbar-brand" activeClassName={claseActiva} to="/ventas">
                                Cargar Ventas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="navbar-brand" activeClassName={claseActiva} to="/clientes">
                                Cargar Cliente
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="navbar-brand" activeClassName={claseActiva} to="/productos/cargar">
                                Cargar productos
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}