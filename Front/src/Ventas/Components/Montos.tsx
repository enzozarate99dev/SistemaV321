import { Input } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../../utils/Button";
import FormaDePago from "./FormaDePago";

export default function Montos(props: montosProps) {
  const [contado, setContado] = useState(0);
  const [debito, setDebito] = useState(0);
  const [mp, setMP] = useState(0);
  const [transf, setTransf] = useState(0);

  function calcularMonto() {
    const total = contado + debito + mp + transf;

    if (total > props.montoAPagar) {
      console.log(`no se puede ingresar mas de ${props.montoAPagar}`);
      Swal.fire({
        title: "Error!",
        text: "La cantidad no puede superar el monto de la venta",
        icon: "error",
      });
    } else if (total < props.montoAPagar) {
      console.log(`la deuda es ${props.montoAPagar - total}`);
    } else {
      console.log("se guardo la venta");
    }
  }

  return (
    <div className="container">
      <Button onClick={() => calcularMonto()}> asdasd</Button>

      <div className="d-flex justify-content-center align-items-center">
        <div className="text">CONTADO</div>
        <Input
          key={1}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          onChange={(e) => setContado(parseInt(e.target.value))}
          // onPressEnter={() => calcularMonto()}
          disabled={props.formaDePago !== "contado"}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text">DEBITO</div>
        <Input
          key={2}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          onChange={(e) => setDebito(parseInt(e.target.value))}
          disabled={props.formaDePago !== "debito"}
          onPressEnter={() => calcularMonto()}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text"> MERCADO PAGO </div>
        <Input
          key={4}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          onChange={(e) => setMP(parseInt(e.target.value))}
          disabled={props.formaDePago !== "mercadoPago"}
          onPressEnter={() => calcularMonto()}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text">TRANSFERENCIA</div>
        <Input
          key={5}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          onChange={(e) => setTransf(parseInt(e.target.value))}
          disabled={props.formaDePago !== "transferencia"}
          onPressEnter={() => calcularMonto()}
        />
      </div>
    </div>
  );
}

interface montosProps {
  montoAPagar: number;
  formaDePago: string;
}
