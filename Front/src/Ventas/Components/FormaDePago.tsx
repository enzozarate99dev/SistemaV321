import { useState } from "react";
import AddIcon from "../../assets/AddIcon";
import Banco from "../../assets/Banco";
import Dinero from "../../assets/Dinero";
import MercadoPago from "../../assets/MercadoPago";
import TarjetaCredito from "../../assets/TarjetaCredito";
import TarjetaDebito from "../../assets/TarjetaDebito";
import { ventasCrear } from "../../Models/ventas.model";
import Button from "../../utils/Button";

export default function FormaDePago({ setFormaDePago, onSuccess }: formadePagoProps) {
  const onClick = (value: number) => {
    setFormaDePago(value);
    onSuccess();
  };
  return (
    <>
      <div className="container">
        <Button onClick={() => onClick(1)}>
          <div>CONTADO</div>
          <Dinero />
        </Button>
      </div>
      <div className="container">
        <Button onClick={() => onClick(2)}>
          <div>DEBITO</div>
          <TarjetaDebito />
        </Button>
      </div>
      <div className="container">
        <Button onClick={() => onClick(3)}>
          <div>CREDITO</div>
          <TarjetaCredito />
        </Button>
      </div>
      <div className="container">
        <Button onClick={() => onClick(4)}>MercadoPago</Button>
      </div>
      <div className="container">
        <Button onClick={() => onClick(5)}>
          <div>TRANSFERENCIA</div>
          <Banco />
        </Button>
      </div>
    </>
  );
}

interface formadePagoProps {
  formadePago: number | undefined;
  setFormaDePago(formaDePago: number): void;
  onSuccess(): void;
}
