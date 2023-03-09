import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import Button from "../../utils/Button";
import "./ventaStyles.css";
import { useState } from "react";
import "./ventaStyles.css";

export default function FormaDePago({ setFormaDePago, onSuccess }: formadePagoProps) {
  // const [pago, setPago] = useState<pago[]>([]);
  const [botonSeleccionado, setBotonSeleccionado] = useState(0);

  const onClick = (value: number) => {
    setFormaDePago(value);
    if (botonSeleccionado === value) {
      setBotonSeleccionado(0);
    } else {
      setBotonSeleccionado(value);
    }
    console.log(value);
  };

  const pagoCredito = (value: number) => {
    setFormaDePago(value);
    onSuccess();
  };

  const handleButtonClick = (valor: number) => {
    if (botonSeleccionado === valor) {
      setBotonSeleccionado(0);
    } else {
      setBotonSeleccionado(valor);
    }
  };

  return (
    <div className="d-flex flex-column" style={{ padding: "30px" }}>
      <div className="d-flex align-items-start mx-5">
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: botonSeleccionado === 1 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: botonSeleccionado === 1 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(1);
            }}
          >
            <Dinero />
            <p>CONTADO</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: botonSeleccionado === 2 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: botonSeleccionado === 2 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(2);
              // handleButtonClick();
            }}
          >
            <TarjetaDebito />
            <p>DEBITO</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: botonSeleccionado === 3 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: botonSeleccionado === 3 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              pagoCredito(3);
              // seleccionado();
            }}
          >
            <TarjetaCredito />
            <p>CREDITO</p>
          </Button>
        </div>
      </div>

      <div className="d-flex mx-5 px-5 ">
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: botonSeleccionado === 4 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: botonSeleccionado === 4 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(4);
              // seleccionado();
            }}
          >
            <p> Mercado Pago</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: botonSeleccionado === 5 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: botonSeleccionado === 5 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(5);
              // seleccionado();
            }}
          >
            <Banco />
            <p>TRANSFERENCIA</p>
          </Button>
        </div>
        {/* <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: botonSeleccionado === 6 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: botonSeleccionado === 6 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(6);
            }}
          >
            <Dinero />
            <p>Cta Corriente</p>
          </Button>
        </div> */}
      </div>
    </div>
  );
}

interface formadePagoProps {
  formadePago: number;
  setFormaDePago(formaDePago: number): void;
  onSuccess(): void;
}
