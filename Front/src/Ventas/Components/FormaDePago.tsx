import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import Button from "../../utils/Button";
import "./ventaStyles.css";
import { metodosDePago, pagos, ventaOrderPagos } from "../../Models/ventas.model";
import { useEffect, useRef, useState } from "react";
import "./ventaStyles.css";

export default function FormaDePago({ setFormaDePago, onSuccess }: formadePagoProps) {
  const [metodoPago, setMetodoPago] = useState<metodosDePago[]>([]);
  const [pago, setPago] = useState<pagos[]>([]);
  const [botonSeleccionado, setBotonSeleccionado] = useState(true);

  const onClick = (value: string) => {
    setFormaDePago(value);
    console.log(value);
  };

  const pagoCredito = (value: string) => {
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
              onClick("contado");
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
              onClick("debito");
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
              pagoCredito("credito");
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
              onClick("mercadoPago");
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
              onClick("transferencia");
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
  formadePago: string;
  setFormaDePago(formaDePago: string): void;
  onSuccess(): void;
  ventaOrderPagos?: ventaOrderPagos[];
}
