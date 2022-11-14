import { useContext, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useHistory } from "react-router-dom";
import UserIcon from "../assets/UserIcon";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/handlerJWT";
import Button from "./Button";
import './menu.css'
import { ReactComponent as UserNBIcon } from "../assets/userNavBar.svg"
import { ReactElement } from "react-markdown/lib/react-markdown";
import LogOut from "../assets/LogOut";


export default function Menu() {
    const { actualizar } = useContext(AutenticacionContext)
    const claseActiva = "active";
    const history = useHistory()

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Sistema</Navbar.Brand>
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
                            <NavDropdown title="Ventas" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/listadoVentas">Gestionar ventas</NavDropdown.Item>
                                <NavDropdown.Item href="/redirigirVentas">Cargar venta</NavDropdown.Item>
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
                            <NavDropdown  title={<LogOut />}>
                                <NavDropdown.Item><a onClick={() => {
                                logout()
                                actualizar([])
                                history.push('/')
                                history.go(0)
                            }} style={{color:'black'}}>Log out</a></NavDropdown.Item>
                            </NavDropdown>

                            {/* <Button onClick={() => {
                                logout()
                                actualizar([])
                                history.push('/')
                                history.go(0)
                            }} className="nav-link btn btn-secondary">Log out</Button> */}
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


