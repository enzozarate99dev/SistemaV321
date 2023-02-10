import { Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import { productoModel } from "../../Models/producto.model";
import { ventaOrderPagos, ventaLineCreacion } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormaDePago from "./FormaDePago";
import Montos from "./Montos";
import PagoCredito from "./PagoCredito";

export default function RealizarVenta(props: realizarVentaProps) {
  const [openFormaDePago, setOpenFormaDePago] = useState(false);

  const [current, setCurrent] = useState(0);
  const [formadePago, setFormadePago] = useState<string>();

  const [subTotal, setSubTotal] = useState(0);
  const [totalConDescuento, setDescuento] = useState(0);

  const [ventaLineCreacion, setVentaLineCreacion] = useState<ventaLineCreacion[]>([]);
  const [ventaOrdenPagosCreacion, setVentaOrdenPagosCreacion] = useState<ventaOrderPagos[]>([]);

  const showCargarVenta = () => {
    setOpenFormaDePago(!openFormaDePago);
    props.setFlag();
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "",
      content: (
        <FormaDePago
          formadePago={formadePago!}
          setFormaDePago={setFormadePago}
          ventaOrderPagos={ventaOrdenPagosCreacion}
          onSuccess={next}
        />
      ),
    },
    {
      title: "",
      content: formadePago === "3" ? <PagoCredito /> : <Montos montoAPagar={totalConDescuento || subTotal} formaDePago={formadePago!} />,
    },
  ];

  const items = steps.map((item, index) => (
    <Steps.Step
      key={item.title}
      icon={
        <div
          style={{
            backgroundColor: current === index ? "#1DCA94" : "#6A7580",
            width: 40,
            height: 40,
            borderRadius: "50%",
          }}
        ></div>
      }
    />
  ));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
  };

  useEffect(() => {
    setVentaLineCreacion(
      props.productos.map((p) => ({
        id_producto: p.id_producto,
        precioUnitario: p.precio,
        cantidad: p.cantidad,
        iva: 0,
        producto: [
          {
            id_producto: p.id_producto,
            nombre: p.nombre,
            precio: p.precio,
            cantidad: p.cantidad,
            codigo: " ",
            categoria: " ",
            descripcion: " ",
          },
        ],
      }))
    );
    console.log(props.productos);
  }, []);

  return (
    <>
      <Button
        style={{
          width: 100,
          backgroundColor: "#fff",
          border: "3px solid #11A629",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 10,
          color: "#000",
        }}
        onClick={() => showCargarVenta()}
      >
        PAGAR
      </Button>
      <Modal
        title="Cargar venta"
        width={980}
        // style={{ height: 579 }}
        open={openFormaDePago}
        footer={null}
        centered
        onCancel={showCargarVenta}
      >
        <div>
          <Steps current={current} onChange={onChange}>
            {items}
          </Steps>
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "end" }}>
            {current < steps.length - 1 && <Button onClick={() => next()}>Siguiente</Button>}
            {current === steps.length - 1 && <Button onClick={() => {}}>REALIZAR VENTA</Button>}
          </div>
        </div>
      </Modal>
    </>
  );
}
export interface realizarVentaProps {
  setFlag: () => void;
  productos: productoModel[];
}
