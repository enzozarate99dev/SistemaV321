import { Link } from "react-router-dom";

export default function Redirigir() {
    return (
        <>
            <div className="container" style={{ marginTop: '50px' }}>
                <Link to='/ventas' className="btn btn-dark">Cargar venta para cliente registrado</Link>
            </div>
            <div className="container" style={{ marginTop: '50px' }}>
                <Link to='/ventasConsumidorFinal' className="btn btn-dark">Cargar venta para consumidor final</Link>
            </div>
        </>
    )
}