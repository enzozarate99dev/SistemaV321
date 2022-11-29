import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from "react-router-dom";
import DashboardIcon from "../assets/DashboardIcon";
import LogOut from "../assets/LogOut";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/handlerJWT";
import './menu.css';


export default function Menu() {
    const { actualizar } = useContext(AutenticacionContext)
    const claseActiva = "active";
    const history = useHistory()

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand style={{padding:'0 100px'}} href="/"><DashboardIcon/></Navbar.Brand>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Autorizado autorizado={<>

                            <NavDropdown title="Productos" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoProductos">Gestionar productos</NavDropdown.Item>
                                <NavDropdown.Item href="/productos/cargar">Cargar producto</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Clientes" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoClientes">Gestionar clientes</NavDropdown.Item>
                                <NavDropdown.Item href="/clientes">Cargar cliente</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Proveedores" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoProveedores">Gestionar proveedores</NavDropdown.Item>
                                <NavDropdown.Item href="/proveedores">Cargar proveedor</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Ventas" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoVentas">Gestionar ventas</NavDropdown.Item>
                                <NavDropdown.Item href="/redirigirVentas">Cargar venta</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Compras" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoCompras">Gestionar compras</NavDropdown.Item>
                                <NavDropdown.Item href="/compras">Cargar Compra</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Presupuestos" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoPresupuestos">Gestionar presupuestos</NavDropdown.Item>
                                <NavDropdown.Item href="/ventas/presupuesto">Generar presupuesto</NavDropdown.Item>
                            </NavDropdown>
                        </>}
                        />
                        <Autorizado role="admin" autorizado={
                            <>
                                <NavDropdown title="Usuarios" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/listadoUsuarios">Gestionar usuarios</NavDropdown.Item>
                                    <NavDropdown.Item href="/registro">Registrar usuario</NavDropdown.Item>
                                </NavDropdown>

                            </>
                        } />
                    </Nav>
                    <Autorizado autorizado={<>
                        <div className="d-flex">
                            <NavDropdown title={<LogOut />}>
                                <NavDropdown.Item><a onClick={() => {
                                    logout()
                                    actualizar([])
                                    history.push('/')
                                    history.go(0)
                                }} style={{ color: 'black' }}>Log out</a></NavDropdown.Item>
                            </NavDropdown>
                        </div></>}

                        noAutorizado={
                            <>
                                <Nav>
                                    <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
                                </Nav>
                            </>
                        } />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


