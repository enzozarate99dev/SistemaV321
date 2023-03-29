import { Input, InputNumber } from "antd";
import { indexOf } from "lodash";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../../utils/Button";

export default function Montos(props: montosProps) {
  const [disabled, setDisabled] = useState([true, true, true, true]);
  const [inputMonto, setInputMonto] = useState([0, 0, 0, 0]);
  const [importeEnPantalla, setImporteEnPantalla] = useState(props.montoAPagar);

  useEffect(() => {
    setDisabled([
      !props.formaDePago.includes(1),
      !props.formaDePago.includes(2),
      !props.formaDePago.includes(4),
      !props.formaDePago.includes(5),
    ]);
  }, [props.formaDePago]);

  /*Hace una copia del arr inputMonto y le asigna el valor del input, luego setea esos valores en el arr original. Despues setea el monto a pagar a medida q cambia el valor de cada input */
  const calcularMontos = (e: any, id_input: number) => {
    const arrCopia = [...inputMonto];
    arrCopia[id_input - 1] = e;
    console.log(e, "e");
    setInputMonto(arrCopia);
    const sum = arrCopia.reduce((a, b) => a + b, 0);
    setImporteEnPantalla(props.montoAPagar - sum);
  };

  /* proximo cambio: que el importe tambien pueda ser menor que el precioDeVenta, para poder generar deuda */
  return (
    <div className="container">
      <h6> Total a pagar ${importeEnPantalla} </h6>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text">CONTADO</div>
        <InputNumber
          key={1}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          disabled={disabled[0]}
          onChange={(e) => calcularMontos(e, 1)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text">DEBITO</div>
        <InputNumber
          key={2}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          disabled={disabled[1]}
          onChange={(e) => calcularMontos(e, 2)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text"> MERCADO PAGO </div>
        <InputNumber
          key={4}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          disabled={disabled[2]}
          onChange={(e) => calcularMontos(e, 3)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text">TRANSFERENCIA</div>
        <InputNumber
          key={5}
          placeholder="Ingrese el monto"
          style={{ width: 200, marginBottom: "1rem" }}
          disabled={disabled[3]}
          onChange={(e) => calcularMontos(e, 4)}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            const suma = inputMonto.reduce((a, b) => a + b);
            if (suma == props.montoAPagar) {
              props.finalizarVenta();
            } else {
              Swal.fire({
                title: "Monto inválido",
                icon: "warning",
                showConfirmButton: false,
              });
            }
          }}
        >
          REALIZAR VENTA
        </Button>
      </div>
    </div>
  );
}

interface montosProps {
  montoAPagar: number;
  formaDePago: number[];
  finalizarVenta(): void;
}

/* los input q se seteen deben poder modificar el monto a pagar. Ese monto puede pagarse con cualquier proporcion de cada pago, pero al final la suma de los inputs 
no puede ser mayor ni menor que el montoAPagar que llega por props. 

Por ejemplo: Los inputs CONTADO y DEBITO están habilitados, y el montoAPagar es 100. El usuario puede ingresar 20 en CONTADO y 80 en DEBITO

*/
