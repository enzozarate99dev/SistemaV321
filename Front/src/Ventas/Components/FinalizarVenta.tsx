import { Modal, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { productoModel } from "../../Models/producto.model";
import { ventaLineCreacion, ventaCreacionDTO, pagoCreacion } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormaDePago from "./FormaDePago";
import * as services from "../Services/ventas.services";
import Swal from "sweetalert2";
import Montos from "./Montos";
import PagoCredito from "./PagoCredito";
import AutenticacionContext from "../../auth/AutenticacionContext";

export default function FinalizarVenta(props: realizarVentaProps) {
  const [openFormaDePago, setOpenFormaDePago] = useState(false);

  const [current, setCurrent] = useState(0);
  const [metodosDePago, setMetodosDePago] = useState<number[]>([]);

  const [ventaLineCreacion, setVentaLineCreacion] = useState<ventaLineCreacion[]>([]);
  const [pagoCreacion, setPagoCreacion] = useState<pagoCreacion[]>([]);

  const { sucursalId } = useContext(AutenticacionContext);

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

  const handlePagoSubmit = (selectedMethods: number[]) => {
    setMetodosDePago(selectedMethods);
  };

  const steps = [
    {
      title: "",
      content: (
        <FormaDePago
          importe={props.montoAPagar}
          formadePago={metodosDePago!}
          setFormaDePago={setMetodosDePago}
          onSuccess={next}
          handlePagoSubmit={handlePagoSubmit}
        />
      ),
    },
    {
      title: "",
      content:
        metodosDePago.length === 1 && metodosDePago[0] === 3 ? (
          <PagoCredito />
        ) : (
          <Montos montoAPagar={props.montoAPagar} formaDePago={metodosDePago} finalizarVenta={finalizarVenta} />
        ),
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
        productoId: p.id_producto,
        cantidad: p.cantidad,
      }))
    );
  }, [props.productos]);

  useEffect(() => {
    setPagoCreacion([
      {
        importe: props.montoAPagar,
        metodosDePagoIds: metodosDePago,
      },
    ]);
  }, [metodosDePago, props.montoAPagar]);

  async function finalizarVenta() {
    var venta: ventaCreacionDTO = {
      clienteId: props.clientes.id_cliente,
      ventaLines: ventaLineCreacion,
      pagos: pagoCreacion,
      descuento: props.descuento,
      sucursalId: sucursalId,
    };
    crearVenta(venta);
  }

  function crearVenta(venta: ventaCreacionDTO) {
    services
      .crearVenta(venta)
      .then(() => Swal.fire("Carga Correcta", "La venta fue cargada correctamente", "success"))
      .catch(() => Swal.fire("Carga incorrecta", "No hay suficientes unidades de producto", "error"));
  }

  return (
    <>
      <Button
        style={{
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
      <Modal title="Cargar venta" width={980} open={openFormaDePago} footer={null} centered onCancel={showCargarVenta}>
        <div>
          <Steps current={current} onChange={onChange}>
            {items}
          </Steps>
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "end" }}>
            {current < steps.length - 1 && (
              <Button style={{ backgroundColor: "#D9D9D9", borderColor: "#36D643", color: "#424242" }} onClick={() => next()}>
                Siguiente
              </Button>
            )}
            {current === steps.length - 1}
          </div>
          {/* <Button onClick={() => finalizarVenta()}>REALIZAR VENTA</Button> */}
        </div>
      </Modal>
    </>
  );
}
export interface realizarVentaProps {
  setFlag: () => void;
  productos: productoModel[];
  montoAPagar: number;
  clientes: any;
  descuento?: number;
}
