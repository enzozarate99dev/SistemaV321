import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AutenticacionContext from './auth/AutenticacionContext';
import { obtenerClaims } from './auth/handlerJWT';
import './fondo.css';
import rutas from './Generales/routesConfig';
import { claim } from './Models/auth.model';
import Menu from './utils/Menu';

function App() {

  const [claims, setClaims] = useState<claim[]>([])

  useEffect(() => {
    setClaims(obtenerClaims())
    console.log(claims)
  }, [])

  function actualizar(claims: claim[]) {
    setClaims(claims)
  }


  return (
    <>

        <BrowserRouter>
          <AutenticacionContext.Provider value={{ claims, actualizar }}>
            <Menu />
            <div className="container">
              <Switch>
                {rutas.map(ruta =>
                  <Route key={ruta.path} path={ruta.path}
                    exact={ruta.exact}>
                    <ruta.componente />
                  </Route>)}
              </Switch>
            </div>
          </AutenticacionContext.Provider>
        </BrowserRouter>

    </>
  );
}

export default App;
