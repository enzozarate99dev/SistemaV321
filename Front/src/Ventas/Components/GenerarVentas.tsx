import { Col, Divider, Modal, Row, Select, Switch, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/AddIcon";
import PdfIcon from "../../assets/PdfIcon";
import CargarCliente from "../../Clientes/Components/CargarCliente";
import { urlClientes, urlSucursales } from "../../Generales/endpoints";
import { clienteModel } from "../../Models/clientes.model";
import { productoModel } from "../../Models/producto.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import CargarProducto from "../../Productos/Components/CargarProducto";
import Button from "../../utils/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../utils/modal.css";
import "./ventaStyles.css";
import FinalizarVenta from "./FinalizarVenta";
import ButtonDescuento from "../../utils/ButtonDescuento";
import ListaProductosVenta from "./ListaProductosVenta";
import TablaProductosVenta from "./TablaProductosVenta";
import { sucursalModel } from "../../Models/sucursal.model";

export default function GenerarVentas(props: propsListadoVentas) {
  const [openCliente, setOpenCliente] = useState(false);
  const [openProducto, setOpenProducto] = useState(false);

  const [productosTabla1, setProductosTabla1] = useState<productoModel[]>([]);
  const [productosTabla2, setProductosTabla2] = useState<productoModel[]>([]);

  const [subTotal, setSubTotal] = useState(0);
  const [montoAPagarFinal, setMontoAPagarFinal] = useState(0);
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [porcentajeBotonSeleccionado, setPorcentajeBotonSeleccionado] = useState(0);

  const [clientes, setCliente] = useState<clienteModel[]>([]);
  const [clienteSeleccionado, setClienteSeleccioando] = useState<clienteModel | null>();

  const [sucursal, setSucursal] = useState([]);

  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flag);
  };

  //Modales
  const showCargarCliente = () => {
    setOpenCliente(!openCliente);
    props.setFlag();
  };

  const showCargarProducto = () => {
    setOpenProducto(!openProducto);
    props.setFlag();
  };

  //Obtener productos y clientes
  useEffect(() => {
    setProductosTabla1(props.productos);
  }, [props.productos]);

  useEffect(() => {
    async function traerClientes() {
      const result = await axios(`${urlClientes}`);
      setCliente(
        result.data.map((cliente: clienteModel) => ({
          value: cliente.id_cliente,
          label: cliente.nombreYApellido,
        }))
      );
    }
    traerClientes();
  }, []);
  useEffect(() => {
    async function getSuc() {
      const result = await axios(`${urlSucursales}`);
      setSucursal(
        result.data.map((suc: sucursalModel) => ({
          value: suc.id,
          label: suc.direccion,
        }))
      );
    }
    getSuc();
  }, []);

  async function selectCliente(id: number) {
    const result = await axios(`${urlClientes}/${id}`);
    const cliente = result.data;
    setClienteSeleccioando(cliente);
  }

  //Tablas de productos
  function moverProductos(id: number) {
    const prod = productosTabla1.find((p) => p.id_producto === id)!;

    setProductosTabla2([...productosTabla2, prod]);
    setProductosTabla1(productosTabla1.filter((p) => p.id_producto !== id));
  }

  const cambiarCantidad = (id: number, newCantidad: number) => {
    const newProductosTabla2 = productosTabla2.map((producto) => {
      if (producto.id_producto === id) {
        return { ...producto, cantidad: newCantidad, precioF: producto.precio * newCantidad };
      }
      return producto;
    });

    setProductosTabla2(newProductosTabla2);
    setSubTotal(calcularSubtotal(newProductosTabla2));
  };

  const quitarProducto = (id: number) => {
    const prod = productosTabla2.find((p) => p.id_producto === id)!;

    setProductosTabla1([...productosTabla1, prod]);
    setProductosTabla2(productosTabla2.filter((p) => p.id_producto !== id));
    setSubTotal(calcularSubtotal(productosTabla2.filter((p) => p.id_producto !== id)));
  };

  function exportPdf() {
    const doc = new jsPDF();
    doc.text("Lista de Productos", 10, 10);

    autoTable(doc, {
      head: [["Nombre", "Cantidad", "Precio Unitario", "Precio Final"]],
      body: productosTabla2.map((p) => [p.nombre, p.cantidad, p.precio, p.precioF!]),
    });
    doc.save("presupuesto.pdf");
  }

  //Ventas
  function calcularSubtotal(productos: productoModel[]) {
    const subtotal = productos.reduce((suma, producto) => suma + producto.precioF!, 0);
    return subtotal;
  }

  function calcularDescuento(porcentaje: number) {
    if (descuentoAplicado && porcentaje === porcentajeBotonSeleccionado) {
      //para que se aplique descuento dependiendo de onClick
      setMontoAPagarFinal(Math.round(subTotal));
      setDescuentoAplicado(false);
      setPorcentajeBotonSeleccionado(0);
    } else {
      const totalConDescuento = subTotal - subTotal * (porcentaje / 100);
      setMontoAPagarFinal(Math.round(totalConDescuento));
      setDescuentoAplicado(true);
      setPorcentajeBotonSeleccionado(porcentaje);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <Row style={{ height: "100vh" }}>
        <Col xl={7} lg={19} xs={19} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              {props.buscador}
              <Button
                style={{}}
                onClick={() => {
                  showCargarProducto();
                }}
                className="btn btn-transparent"
              >
                <AddIcon />
              </Button>
              <Modal title="Cargar Producto" width={1150} open={openProducto} footer={null} centered onCancel={showCargarProducto}>
                <p>
                  <CargarProducto setFlagModal={showCargarProducto} setFlagListado={props.setFlag} sucursal={sucursal} />
                </p>
              </Modal>
            </div>
            <div className="container">
              {productosTabla1.length > 0 && (
                <>
                  <ListaProductosVenta productos={productosTabla1} moverProductos={moverProductos} /> {props.paginacion}
                </>
              )}
            </div>
          </div>
        </Col>
        <Col xl={1} lg={0} xs={0}>
          <Divider type="vertical" style={{ backgroundColor: "black", height: "75vh", marginBlock: "5vw" }} />
        </Col>
        <Col xl={11} lg={19} xs={19} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1%", gap: "5%" }}>
          <h6>Articulos Cargados</h6>
          <TablaProductosVenta productos={productosTabla2} cambiarCantidad={cambiarCantidad} quitarProducto={quitarProducto} />
          <Button
            onClick={() => exportPdf()}
            className="btn btn-transparent "
            style={{
              backgroundColor: "#F5F5F5",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 7,
              width: 80,
              height: 50,
            }}
          >
            <PdfIcon />
            <p style={{ fontSize: 10, margin: 0, textAlign: "center" }}>Presupuesto</p>
          </Button>
        </Col>

        <Col
          xl={{ push: 0, pull: 0 }}
          lg={5}
          sm={5}
          style={{
            backgroundColor: "#F5F5F5",
            boxShadow: "-3px 0px 4px rgba(0, 0, 0, 0.25)",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            overflow: "scroll",
            height: "100vh",
          }}
          className=" d-flex flex-column justify-content-around align-items-center pb-5 "
        >
          <div className="container d-flex justify-content-center align-items-center">
            <Select
              showSearch
              onSelect={selectCliente}
              style={{ width: "80%" }}
              placeholder="Seleccionar cliente"
              showArrow={false}
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? "").includes(input)}
              filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
              options={clientes}
            />
            <Button
              style={{ width: "20%" }}
              onClick={() => {
                showCargarCliente();
              }}
              className="btn btn-transparent"
            >
              <AddIcon />
            </Button>
            <Modal title="Cargar Cliente" width={1150} open={openCliente} footer={null} centered onCancel={showCargarCliente}>
              <CargarCliente setFlagModal={showCargarCliente} setFlagListado={props.setFlag} />
            </Modal>
          </div>
          {/* <div className="d-flex flex-column justify-content-center align-items-center  "> */}
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <p>CONDICION</p>
            <div
              style={{
                marginBlock: "15%",
                display: "flex",
                alignItems: "middle",
                justifyContent: "center",
                gap: "20%",
              }}
            >
              C.F
              <Switch style={{ backgroundColor: "#3B4256" }} />
              R.I
            </div>
          </div>
          <div className="container">
            <Input placeholder="DNI/CUIT" value={clienteSeleccionado?.nroDocumento} />
          </div>
          <Divider />
          <div className="container">
            <p>Datos del Cliente</p>
            <Input
              placeholder="Nombre/Razon Social"
              value={
                clienteSeleccionado?.nombreYApellido && clienteSeleccionado?.razonSocial
                  ? `${clienteSeleccionado?.nombreYApellido} / ${clienteSeleccionado?.razonSocial}`
                  : ""
              }
              key={clienteSeleccionado?.id_cliente}
            />
          </div>
          <Divider />

          <p>Importe</p>
          <p>Subtotal: ${subTotal}</p>

          <div className="mt-4">
            <div className="d-flex flex-wrap justify-content-center  ">
              <ButtonDescuento calcularDescuento={calcularDescuento} valor={15} porcentaje={porcentajeBotonSeleccionado} />
              <ButtonDescuento calcularDescuento={calcularDescuento} valor={20} porcentaje={porcentajeBotonSeleccionado} />
              <ButtonDescuento calcularDescuento={calcularDescuento} valor={30} porcentaje={porcentajeBotonSeleccionado} />
            </div>
            <div className="mx-1">
              <h6>IMPORTE TOTAL</h6>

              <Input
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "3px solid #33384C",
                  borderRadius: "7px",
                  minWidth: "100%",
                }}
                disabled={true}
                value={`$ ${montoAPagarFinal || subTotal}`}
              ></Input>
            </div>
          </div>
          <div className="container mt-4">
            <FinalizarVenta
              setFlag={handleFlag}
              productos={productosTabla2}
              montoAPagar={montoAPagarFinal || subTotal}
              clientes={clienteSeleccionado}
              descuento={porcentajeBotonSeleccionado}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

interface propsListadoVentas {
  ventas?: ventasModel[];
  ventasConsFinal?: ventasConsumidorFinalModel[];
  setFlag: () => void;
  onSuccess?: any;
  productos: productoModel[];
  buscador: JSX.Element;
  paginacion: JSX.Element;
}
