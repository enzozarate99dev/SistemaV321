import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import AddIcon from "../assets/AddIcon";
import RestaIcon from "../assets/RestaIcon";
import { productoModel } from "../Models/producto.model";
import Button from "./Button";

export default function InputVentas(props: inputVentasProps) {
  const [valor, setValor] = useState<number>(1);
  const [maxVal, setMaxVal] = useState<number>(props.cantidad);

  const aumentar = (prod: productoModel) => {
    // const newCantidad = valor;
    // if (newCantidad < maxVal) {
    //   setValor(newCantidad + 1);
    // }
    if (valor < maxVal) {
      setValor(valor + 1);
    }
    // props.cambiarCantidad(prod.id_producto, newCantidad);
  };

  const disminuir = (prod: productoModel) => {
    const newCantidad = valor > 1 ? valor - 1 : 1;
    setValor(newCantidad);
    // props.cambiarCantidad(prod.id_producto, newCantidad);
  };

  useEffect(() => {
    props.cambiarCantidad(props.prod.id_producto, valor);
  }, [valor, props.prod.id_producto]);

  return (
    <div className="container d-flex gap-3">
      <Button className="btn btn-transparent " onClick={() => disminuir(props.prod)}>
        <RestaIcon />
      </Button>

      <InputNumber
        type="number"
        value={valor}
        onChange={(value) => setValor(value ? value : 1)}
        controls={false}
        style={{ maxWidth: 50 }}
      />
      <Button className="btn btn-transparent " onClick={() => aumentar(props.prod)}>
        <AddIcon height="16" width="16" />
      </Button>
    </div>
  );
}
interface inputVentasProps {
  prod: productoModel;
  cantidad: number;
  cambiarCantidad: (id: number, cantidad: number) => void;
}
