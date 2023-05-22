import "./ventaStyles.css";

export default function DetalleVentas(props: infoVentaProps) {
  const ventaLine = props.detalle.articulos;
  const { cliente, domicilio, nroDocumento, email, condicion } = props.detalle.clienteInfor;

  return (
    <div className="container">
      {props.ocultarInfo ? (
        <></>
      ) : (
        <div className="row m-0">
          <div className="col">
            <h5>Información del cliente </h5>
            <div className="container">
              <p>
                <strong>CLIENTE:</strong> {cliente}
              </p>
              <p>
                <strong>DIRECCION:</strong> {domicilio}
              </p>
              <p>
                <strong>DNI:</strong> {nroDocumento}
              </p>
              <p>
                <strong>EMAIL:</strong> {email}
              </p>
              <p>
                <strong>CONDICION:</strong> {condicion}
              </p>
            </div>
          </div>
          <div className="col"></div>
        </div>
      )}
      <h5> Artículos</h5>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Codigo Artículo</th>
            <th>Descripción</th>
            <th>Cantidad comprada</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ventaLine.map((vl: any) => (
            <tr key={vl.id_venta_line}>
              <td>{vl.producto.codigo}</td>
              <td>
                {vl.producto.nombre} - {vl.producto.descripcion}
              </td>
              <td>{vl.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface infoVentaProps {
  ocultarInfo?: boolean;
  detalle?: any;
  setFlagModal?: () => void;
  setFlagListado?: () => void;
}
