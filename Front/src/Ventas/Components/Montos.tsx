import { Input } from "antd";

export default function Montos() {
  return (
    <div className="conainer">
      <div className="d-flex justify-content-center align-items-center">
        <div>CONTADO</div>
        <Input placeholder="Ingrese el monto" style={{ width: 200 }} />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div>DEBITO</div>
        <Input placeholder="Ingrese el monto" style={{ width: 200 }} />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div> MERCADO PAGO </div>
        <Input placeholder="Ingrese el monto" style={{ width: 200 }} />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div>TRANSFERENCIA</div>
        <Input placeholder="Ingrese el monto" style={{ width: 200 }} />
      </div>
    </div>
  );
}
