import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./ventaStyles.css";
import Button from "../../utils/Button";
import ImprimirIcon from "../../assets/ImprimirIcon";

export default function DetalleVentas(props: infoVentaProps) {
  const ventaLine = props.detalle.articulos;
  const { cliente, domicilio, nroDocumento, email, condicion } = props.detalle.clienteInfor;

  console.log(ventaLine);

  function exportPdf() {
    const doc = new jsPDF();
    doc.text("Detalle de Venta", 10, 10);

    autoTable(doc, {
      head: [["Codigo Artículo", "Descripción", "Cantidad comprada"]],
      body: ventaLine.map((d: any) => [d.producto.codigo, d.producto.descripcion, d.cantidad]),
    });
    doc.save("DataVenta.pdf");
  }

  return (
    <div className="container">
      {props.ocultarInfo ? (
        <div className="d-flex justify-content-end">
          <Button style={{ marginRight: "1rem" }} className="btn btn-transparent d-flex justify-content-end" onClick={exportPdf}>
            <ImprimirIcon />
          </Button>
        </div>
      ) : (
        <div className="row m-0">
          {/* <div className="d-flex justify-content-end">
            <Button style={{ marginRight: "1rem" }} className="btn btn-transparent d-flex justify-content-end" onClick={exportPdf}>
              <ImprimirIcon />
            </Button>
          </div> */}
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
