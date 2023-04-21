import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import "./ventaStyles.css";
import { useEffect, useState } from "react";
import "./ventaStyles.css";
import Button from "../../utils/Button";

export default function FormaDePago({ onSuccess, importe, setFormaDePago, handlePagoSubmit }: formadePagoProps) {
  const [metodosSeleccionados, setMetodosSeleccionados] = useState<number[]>([]);

  const elegirMetodo = (value: number) => {
    const index = metodosSeleccionados.indexOf(value);
    if (index === -1) {
      setMetodosSeleccionados([...metodosSeleccionados, value]);
    } else {
      setMetodosSeleccionados(metodosSeleccionados.filter((_, i) => i !== index));
    }
  };
  console.log("arreglo de metods en FormaDePago: ", metodosSeleccionados);

  useEffect(() => {
    handlePagoSubmit(metodosSeleccionados);
  }, [metodosSeleccionados]);

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
              color: "#6A7580",
              boxShadow: metodosSeleccionados.includes(1) ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
            }}
            onClick={() => elegirMetodo(1)}
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
              color: "#6A7580",
              boxShadow: metodosSeleccionados.includes(2) ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
            }}
            onClick={() => elegirMetodo(2)}
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
              color: "#6A7580",
              boxShadow: metodosSeleccionados.includes(3) ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
            }}
            onClick={() => elegirMetodo(3)}
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
              color: "#6A7580",
              boxShadow: metodosSeleccionados.includes(4) ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
            }}
            onClick={() => elegirMetodo(4)}
          >
            <p>Mercado Pago</p>
          </Button>
        </div>
        <div className="container">
          <Button
            className="btn btn-transparent boton"
            style={{
              height: 148,
              width: 148,
              backgroundColor: "#FBFBFB",
              color: "#6A7580",
              boxShadow: metodosSeleccionados.includes(5) ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
            }}
            onClick={() => elegirMetodo(5)}
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
  formadePago?: number[];
  setFormaDePago(formaDePago: number[]): void;
  onSuccess(): void;
  importe: number;
  handlePagoSubmit(metodosSeleccionados: number[]): void;
  // cargarPagos(metodoDePago: number[]): void;
}

// se utiliza el hook useState para crear un estado metodosDePago que es un array vacío al inicio. Luego, se define una función onClick que toma
//  un parámetro value que representa el método de pago seleccionado. La función verifica si value ya está incluido en el array
//   metodosDePago. Si es así, utiliza el método filter para crear un nuevo array que excluya value. Si no está incluido, utiliza el
//   spread ... para crear un nuevo array que incluya value.

// Finalmente, la función onClick llama a props.actualizarPagos(metodosDePago) para actualizar el estado del componente Padre con los métodos de
//  pago seleccionados por el usuario.
