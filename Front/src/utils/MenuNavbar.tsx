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
import * as services from "../Usuarios/Services/usuarios.services";
import "./menu.css";

export default function MenuNavbar() {
  const { actualizar, claims } = useContext(AutenticacionContext);
  const claseActiva = "active";
  const history = useHistory();

  function getNameUser(): string {
    return claims.filter((x) => x.nombre === "nombre")[0]?.valor;
  }

  return (
    <Navbar variant="dark" style={{ backgroundColor: "#33384D" }}>
      {/* <Navbar.Brand style={{ padding: "0 100px" }} href="/">
        <DashboardIcon />
      </Navbar.Brand> */}

      <Container className=" asd d-flex  justify-content-end" style={{ maxHeight: 10, marginRight: 0 }}>
        <Autorizado
          autorizado={
            <>
              <div className="d-flex justify-content-center align-items-center">
                <NavDropdown title={<LogOut />}>
                  <NavDropdown.Item>
                    <a
                      href=" "
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
                <p style={{ color: "#ffff", margin: 0, padding: 0 }}> ¡Bienvenido {getNameUser()}!</p>
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
      </Container>
    </Navbar>
  );
}
