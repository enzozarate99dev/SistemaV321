import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import Button from "../../utils/Button";
import "./ventaStyles.css";
import { pago } from "../../Models/ventas.model";
import { useEffect, useRef, useState } from "react";
import "./ventaStyles.css";

export default function FormaDePago({ setFormaDePago, onSuccess }: formadePagoProps) {
  // const [pago, setPago] = useState<pago[]>([]);
  const [botonSeleccionado, setBotonSeleccionado] = useState(true);

  const onClick = (value: number) => {
    setFormaDePago(value);
    console.log(value);
  };

  const pagoCredito = (value: number) => {
    setFormaDePago(value);
    onSuccess();
  };

  return (
    <div className="d-flex flex-column" style={{ padding: "30px" }}>
      <div className="d-flex align-items-start mx-5">
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={
              botonSeleccionado
                ? {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: 10,
                    color: "#6A7580",
                  }
                : {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    color: "#6A7580",
                  }
            }
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
            style={
              botonSeleccionado
                ? {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: 10,
                    color: "#6A7580",
                  }
                : {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    color: "#6A7580",
                  }
            }
            onClick={() => {
              onClick(2);
              // seleccionado();
            }}
          >
            <TarjetaDebito />
            <p>DEBITO</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={
              botonSeleccionado
                ? {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: 10,
                    color: "#6A7580",
                  }
                : {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    color: "#6A7580",
                  }
            }
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
            style={
              botonSeleccionado
                ? {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: 10,
                    color: "#6A7580",
                  }
                : {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    color: "#6A7580",
                  }
            }
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
            style={
              botonSeleccionado
                ? {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: 10,
                    color: "#6A7580",
                  }
                : {
                    height: 148,
                    width: 148,
                    backgroundColor: "#FBFBFB",
                    color: "#6A7580",
                  }
            }
            onClick={() => {
              onClick(5);
              // seleccionado();
            }}
          >
            <Banco />
            <p>TRANSFERENCIA</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface formadePagoProps {
  formadePago: number;
  setFormaDePago(formaDePago: number): void;
  onSuccess(): void;
}
