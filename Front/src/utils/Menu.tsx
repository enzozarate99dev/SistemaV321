import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from "react-router-dom";
import UserIcon from "../assets/UserIcon";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/handlerJWT";
import Button from "./Button";


export default function Menu() {
    const { actualizar } = useContext(AutenticacionContext)
    const claseActiva = "active";
    const history = useHistory()
    return (
        /* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand"
                    activeClassName={claseActiva}
                    to="/">Inicio</NavLink>
                <div className="collapse navbar-collapse"
                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Autorizado role="admin"
                            autorizado={
                                <>
                                    <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                        <NavDropdown title="Productos" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/listadoProductos">Gestionar productos</NavDropdown.Item>
                                            <NavDropdown.Item href="/productos/cargar">Cargar producto</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Clientes" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/listadoClientes">Gestionar clientes</NavDropdown.Item>
                                            <NavDropdown.Item href="clientes">Cargar cliente</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Ventas" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/listadoVentas">Gestionar ventas</NavDropdown.Item>
                                            <NavDropdown.Item href="/ventas">Cargar venta</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                            }
                        />
                    </ul>
                    <div className="d-flex">
                        <Autorizado
                            autorizado={<>
                                <Button
                                    onClick={() => {
                                        logout();
                                        actualizar([]);
                                        history.push('/')
                                        history.go(0)
                                    }}
                                    className="nav-link btn btn-link">Log out</Button>
                            </>}
                            noAutorizado={<>
                                <Link to="/Registro" className="nav-link btn btn-link">
                                    Registro
                                </Link>
                                <Link to="/Login" className="nav-link btn btn-link">
                                    Login
                                </Link>
                            </>}
                        />
                    </div>
                </div>
            </div>
        </nav> */

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Sistema</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Autorizado autorizado={
                        <>
                            <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <NavDropdown title="Productos" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/listadoProductos">Gestionar productos</NavDropdown.Item>
                                    <NavDropdown.Item href="/productos/cargar">Cargar producto</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Clientes" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/listadoClientes">Gestionar clientes</NavDropdown.Item>
                                    <NavDropdown.Item href="/clientes">Cargar cliente</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Ventas" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/listadoVentas">Gestionar ventas</NavDropdown.Item>
                                    <NavDropdown.Item href="/redirigirVentas">Cargar venta</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Presupuestos" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/listadoPresupuestos">Gestionar presupuestos</NavDropdown.Item>
                                    <NavDropdown.Item href="/ventas/presupuesto">Generar presupuesto</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <div className="d-flex">
                                <Button onClick={() => {
                                    logout()
                                    actualizar([])
                                    history.push('/')
                                    history.go(0)
                                }} className="nav-link btn btn-secondary">Log out</Button>
                            </div>
                        </>
                    } noAutorizado={
                        <>
                            <Nav>
                                <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
                                <Nav.Link eventKey={2} href="/registro">
                                    Registrarse
                                </Nav.Link>
                            </Nav>
                        </>
                    }
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

