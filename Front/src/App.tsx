import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AutenticacionContext from "./auth/AutenticacionContext";
import { obtenerClaims } from "./auth/handlerJWT";
import "./fondo.css";
import rutas from "./Generales/routesConfig";
import { claim } from "./Models/auth.model";
import MiLayout from "./utils/MiLayout";
import { sucID } from "./auth/handlerJWT";
import NoAccess from "./utils/NoAccess";

function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [sucursalId, setSucursalId] = useState<number>(0);

  useEffect(() => {
    setClaims(obtenerClaims());
  }, []);

  function actualizar(claims: claim[]) {
    setClaims(claims);
  }
  useEffect(() => {
    const sucID = claims.find((claim) => claim.nombre === "sucursalId")?.valor;
    console.log("sucID", sucID);
    setSucursalId(sucID ? parseInt(sucID) : 0);
  }, [claims]);

  function esAdmin() {
    return claims.findIndex((claim) => claim.nombre === "role" && claim.valor === "admin") > -1;
  }

  function esCajero() {
    return claims.findIndex((claim) => claim.nombre === "role" && claim.valor === "cajero") > -1;
  }

  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar, sucursalId }}>
          <MiLayout>
            <Switch>
              {rutas.map((ruta) => (
                <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                  {ruta.esCajero && !esCajero() && !esAdmin() ? (
                    <NoAccess text="Debes iniciar sesión" />
                  ) : (
                    <>
                      {ruta.esAdmin && !esAdmin() ? (
                        <NoAccess text="No tienes acceso a esta pantalla porque no eres admin" />
                      ) : (
                        <ruta.componente />
                      )}
                    </>
                  )}
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
