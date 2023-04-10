import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useHistory } from "react-router-dom";
import DashboardIcon from "../assets/DashboardIcon";
import LogOut from "../assets/LogOut";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/handlerJWT";
import "./menu.css";

export default function Menu() {
  const { actualizar } = useContext(AutenticacionContext);
  const claseActiva = "active";
  const history = useHistory();

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: "#33384D" }}>
      {/* <Navbar.Brand style={{ padding: "0 100px" }} href="/">
        <DashboardIcon />
      </Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Autorizado
              autorizado={
                <>
                  <Nav.Link href="/listadoProductos">Productos</Nav.Link>
                  <Nav.Link href="/listadoClientes">Clientes</Nav.Link>
                  <Nav.Link href="/listadoProveedores">Proveedores</Nav.Link>
                  <Nav.Link href="/listadoVentas">Ventas</Nav.Link>
                  <Nav.Link href="/listadoCompras">Compras</Nav.Link>
                  <Nav.Link href="/listadoPresupuestos">Presupuestos</Nav.Link>
                </>
              }
            />
            <Autorizado
              role="admin"
              autorizado={
                <>
                  <Nav.Link href="/listadoUsuarios">Usuarios</Nav.Link>
                </>
              }
            />
          </Nav>
          <Autorizado
            autorizado={
              <>
                <div className="d-flex">
                  <NavDropdown title={<LogOut />}>
                    <NavDropdown.Item>
                      <a
                        onClick={() => {
                          logout();
                          actualizar([]);
                          history.push("/");
                          history.go(0);
                        }}
                        style={{ color: "black" }}
                      >
                        Log out
                      </a>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            }
            noAutorizado={
              <>
                <Nav>
                  <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
                </Nav>
              </>
            }
          />
        </Navbar.Collapse>
      </Container> */}
    </Navbar>
  );
}
