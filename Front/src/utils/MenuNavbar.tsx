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

export default function MenuNavbar() {
  const { actualizar } = useContext(AutenticacionContext);
  const claseActiva = "active";
  const history = useHistory();

  return (
    <Navbar variant="dark" style={{ backgroundColor: "#33384D" }}>
      {/* <Navbar.Brand style={{ padding: "0 100px" }} href="/">
        <DashboardIcon />
      </Navbar.Brand> */}
      <Container className="d-flex  justify-content-end" style={{ maxHeight: 10 }}>
        <Autorizado
          autorizado={
            <>
              <div className="d-flex">
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
