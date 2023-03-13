import { Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import { productoModel } from "../../Models/producto.model";
import { ventaLineCreacion, ventaCreacionDTO, pagoCreacion } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormaDePago from "./FormaDePago";
import Montos from "./Montos";
import * as services from "../Services/ventas.services";
import PagoCredito from "./PagoCredito";
import Swal from "sweetalert2";
import { clienteModel } from "../../Models/clientes.model";
import { urlVentas } from "../../Generales/endpoints";

export default function RealizarVenta(props: realizarVentaProps) {
  const [openFormaDePago, setOpenFormaDePago] = useState(false);

  const [current, setCurrent] = useState(0);
  // const [metodosDePago, setMetodosDePago] = useState<number>();

  const [ventaLineCreacion, setVentaLineCreacion] = useState<ventaLineCreacion[]>([]);
  const [pagoCreacion, setPagoCreacion] = useState<pagoCreacion[]>([]);

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
  const cargarPagos = (metodosDePago: number[]) => {
    const nuevosPagos = metodosDePago.map((metodo) => ({
      importe: props.montoAPagar,
      metodoDePago: metodo,
    }));
    setPagoCreacion(nuevosPagos);
  };
  console.log("pagoCreacion en cargarPagos", pagoCreacion);

  const steps = [
    {
      title: "",
      content: (
        <FormaDePago
          cargarPagos={cargarPagos}
          importe={props.montoAPagar}
          // formadePago={metodosDePago!}
          // setFormaDePago={setMetodosDePago}
          onSuccess={next}
        />
      ),
    },
    // {
    //   title: "",
    //   content: metodoDePago == 3 ? <PagoCredito /> : <Montos montoAPagar={props.montoAPagar} formaDePago={metodoDePago!} />,
    // },
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
    console.log(` el ventaline: ${ventaLineCreacion}`);
  }, [props.productos]);

  // useEffect(() => {
  //   setPagoCreacion([
  //     {
  //       importe: props.montoAPagar,
  //       metodoDePago: metodosDePago,
  //     },
  //   ]);
  //   console.log(`pago creacion1: ${pagoCreacion}`);
  // }, [metodosDePago]);

  async function finalizarVenta() {
    var venta: ventaCreacionDTO = {
      clienteId: props.clientes.id_cliente,
      ventaLines: ventaLineCreacion,
      pagos: pagoCreacion,
    };
    crearVenta(venta);
    console.log(venta);
  }

  function crearVenta(venta: ventaCreacionDTO) {
    try {
      services.crearVenta(venta);
      Swal.fire("Carga Correcta", "La venta fue cargada correctamente", "success");
    } catch (error) {
      console.log(error.response.data);
    }
  }

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
      <Modal title="Cargar venta" width={980} open={openFormaDePago} footer={null} centered onCancel={showCargarVenta}>
        <div>
          <Steps current={current} onChange={onChange}>
            {items}
          </Steps>
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "end" }}>
            {current < steps.length - 1 && <Button onClick={() => next()}>Siguiente</Button>}
            {/* {current === steps.length - 1 && <Button onClick={() => finalizarVenta()}>REALIZAR VENTA</Button>} */}
          </div>
          <Button onClick={() => finalizarVenta()}>REALIZAR VENTA</Button>
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
}
