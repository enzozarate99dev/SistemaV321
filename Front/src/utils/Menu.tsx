import { Link, NavLink, useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Autorizado from "../auth/Autorizado";
import Button from "./Button";
import { logout } from "../auth/handlerJWT";
import { useContext } from "react";
import AutenticacionContext from "../auth/AutenticacionContext";


export default function Menu() {
    const {actualizar} = useContext(AutenticacionContext)
    const claseActiva = "active";
    const history = useHistory()
    return (
        /* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand mb-0 h1" to="/" activeClassName={claseActiva}>
                    <img className="d-inline-block align-top" width="30" height="30" src="https://e7.pngegg.com/pngimages/175/742/png-clipart-computer-icons-question-user-interface-creative-question-mark-miscellaneous-text.png"></img>
                    Listado de productos
                </NavLink>
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
        </nav> */

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Sistema</Navbar.Brand>
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
                                    <NavDropdown.Item href="clientes">Cargar cliente</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Ventas" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/listadoVentas">Gestionar ventas</NavDropdown.Item>
                                    <NavDropdown.Item href="/ventas">Cargar venta</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <div className="d-flex">
                                <Button onClick={()=>{
                                    logout()
                                    actualizar([])
                                    history.push('/')
                                    history.go(0)
                                }} className="nav-link btn btn-link">Log out</Button>
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