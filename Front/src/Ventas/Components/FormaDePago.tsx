import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import Button from "../../utils/Button";
import "./ventaStyles.css";
import { useState } from "react";
import "./ventaStyles.css";
import { pagoCreacion } from "../../Models/ventas.model";

export default function FormaDePago({ onSuccess, importe, setFormaDePago }: formadePagoProps) {
  // const [botonSeleccionado, setBotonSeleccionado] = useState(0);
  const [metodosDePago, setMetodosDePago] = useState<number[]>([]);

  const onClick = (value: number) => {
    setFormaDePago(value);
    if (botonSeleccionado === value) {
      setBotonSeleccionado(0);
    } else {
      setBotonSeleccionado(value);
    }
    console.log(value);
  };
  // const onClick = (value: number) => {
  //   const nuevosMetodosDePago = metodosDePago.includes(value)
  //     ? metodosDePago.filter((p) => p !== value) //si value ya esta incluido en metodosDePago, filter crea un nuevo [] que lo saque
  //     : [...metodosDePago, value];
  //   setMetodosDePago(nuevosMetodosDePago);
  //   cargarPagos(nuevosMetodosDePago);
  // };
  // console.log("metodo elegido", metodosDePago);

  // const pagoCredito = (value: number) => {
  //   setFormaDePago(value);
  //   onSuccess();
  // };

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
              // boxShadow: botonSeleccionado === 1 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              // borderRadius: botonSeleccionado === 1 ? 0 : 10,
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
              // boxShadow: botonSeleccionado === 2 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              // borderRadius: botonSeleccionado === 2 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(2);
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
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 10,
              color: "#6A7580",
            }}
            onClick={() => {
              // pagoCredito(3);
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
              // boxShadow: botonSeleccionado === 4 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              // borderRadius: botonSeleccionado === 4 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(4);
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
              // boxShadow: botonSeleccionado === 5 ? "" : "4px 4px 4px rgba(0, 0, 0, 0.25)",
              // borderRadius: botonSeleccionado === 5 ? 0 : 10,
              color: "#6A7580",
            }}
            onClick={() => {
              onClick(5);
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
  formadePago?: number;
  setFormaDePago(formaDePago: number): void;
  onSuccess(): void;
  importe: number;
  // cargarPagos(metodoDePago: number[]): void;
}

// se utiliza el hook useState para crear un estado metodosDePago que es un array vacío al inicio. Luego, se define una función onClick que toma
//  un parámetro value que representa el método de pago seleccionado. La función verifica si value ya está incluido en el array
//   metodosDePago. Si es así, utiliza el método filter para crear un nuevo array que excluya value. Si no está incluido, utiliza el
//   spread ... para crear un nuevo array que incluya value.

// Finalmente, la función onClick llama a props.actualizarPagos(metodosDePago) para actualizar el estado del componente Padre con los métodos de
//  pago seleccionados por el usuario.
