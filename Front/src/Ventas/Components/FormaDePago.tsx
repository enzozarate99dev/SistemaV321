import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import Button from "../../utils/Button";
import "./ventaStyles.css";

export default function FormaDePago({ setFormaDePago, onSuccess }: formadePagoProps) {
  const onClick = (value: number) => {
    setFormaDePago(value);
    onSuccess();
  };
  return (
    <div className="d-flex flex-column" style={{ padding: "30px" }}>
      <div className="d-flex align-items-start mx-5">
        <div className="container">
          <Button
            className="btn btn-transparent"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
              color: "#6A7580",
            }}
            onClick={() => onClick(1)}
          >
            <Dinero />
            <p>CONTADO</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
              color: "#6A7580",
            }}
            onClick={() => onClick(2)}
          >
            <TarjetaDebito />
            <p>DEBITO</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
              color: "#6A7580",
            }}
            onClick={() => onClick(3)}
          >
            <TarjetaCredito />
            <p>CREDITO</p>
          </Button>
        </div>
      </div>

      <div className="d-flex mx-5 px-5 ">
        <div className="container">
          <Button
            className="btn btn-transparent"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
              color: "#6A7580",
            }}
            onClick={() => onClick(4)}
          >
            <p> Mercado Pago</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
              color: "#6A7580",
            }}
            onClick={() => onClick(5)}
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
