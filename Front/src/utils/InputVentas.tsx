import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import AddIcon from "../assets/AddIcon";
import RestaIcon from "../assets/RestaIcon";
import { productoModel } from "../Models/producto.model";
import Button from "./Button";

export default function InputVentas(props: inputVentasProps) {
  // console.log(props.prod.cantidad, "lleaga cant");
  const [valor, setValor] = useState<number>(1);

  const aumentar = (prod: productoModel) => {
    const newCantidad = valor < props.prod.cantidad ? valor + 1 : valor;
    setValor(newCantidad);
    props.cambiarCantidad(prod.id_producto, newCantidad);
  };

  const disminuir = (prod: productoModel) => {
    const newCantidad = valor > 1 ? valor - 1 : 1;
    setValor(newCantidad);
    props.cambiarCantidad(prod.id_producto, newCantidad);
  };

  return (
    <div className="container d-flex gap-3">
      <Button className="btn btn-transparent " onClick={() => disminuir(props.prod)}>
        <RestaIcon />
      </Button>

      {/* <InputNumber value={valor} max={props.prod.cantidad} onChange={(value) => setValor(value ? value : 1)} style={{ width: 100 }} />
       */}
      <input
        type="number"
        value={valor}
        max={props.prod.cantidad}
        onChange={(e) => setValor(parseInt(e.target.value))}
        style={{ width: 100 }}
      />
      <Button className="btn btn-transparent " onClick={() => aumentar(props.prod)}>
        <AddIcon height="16" width="16" />
      </Button>
    </div>
  );
}
interface inputVentasProps {
  prod: productoModel;
  // cantidad: number;
  cambiarCantidad: (id: number, cantidad: number) => void;
}
