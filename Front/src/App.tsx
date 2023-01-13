import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AutenticacionContext from "./auth/AutenticacionContext";
import { obtenerClaims } from "./auth/handlerJWT";
import "./fondo.css";
import rutas from "./Generales/routesConfig";
import { claim } from "./Models/auth.model";
import Menu from "./utils/Menu";

function App() {
  //swdf
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
    console.log(claims);
  }, []);

  function actualizar(claims: claim[]) {
    setClaims(claims);
  }

  function esAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.nombre === "role" && claim.valor === "admin"
      ) > -1
    );
  }

  function esCajero() {
    return (
      claims.findIndex(
        (claim) => claim.nombre === "role" && claim.valor === "cajero"
      ) > -1
    );
  }

  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar }}>
          <Menu />
          <div className="container">
            <Switch>
              {rutas.map((ruta) => (
                <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                  {ruta.esCajero && !esCajero() && !esAdmin() ? (
                    <>No tienes permiso</>
                  ) : (
                    <>
                      {ruta.esAdmin && !esAdmin() ? (
                        <>No tienes permiso</>
                      ) : (
                        <ruta.componente />
                      )}
                    </>
                  )}
                </Route>
              ))}
            </Switch>
          </div>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
