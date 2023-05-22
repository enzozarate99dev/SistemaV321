import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AutenticacionContext from "./auth/AutenticacionContext";
import { obtenerClaims } from "./auth/handlerJWT";
import "./fondo.css";
import rutas from "./Generales/routesConfig";
import { claim } from "./Models/auth.model";
import MiLayout from "./utils/MiLayout";

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
    console.log(claims);
  }, []);

  function actualizar(claims: claim[]) {
    setClaims(claims);
  }

  function esAdmin() {
    return claims.findIndex((claim) => claim.nombre === "role" && claim.valor === "admin") > -1;
  }

  function esCajero() {
    return claims.findIndex((claim) => claim.nombre === "role" && claim.valor === "cajero") > -1;
  }

  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar }}>
          {/* <MenuNavbar /> */}
          <MiLayout>
            <Switch>
              {rutas.map((ruta) => (
                <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                  {ruta.esCajero && !esCajero() && !esAdmin() ? (
                    <h1>Debes iniciar sesión</h1>
                  ) : (
                    <>{ruta.esAdmin && !esAdmin() ? <h1>No eres administrador</h1> : <ruta.componente />}</>
                  )}
                  {/* <ruta.componente /> */}
                </Route>
              ))}
            </Switch>
          </MiLayout>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
