import { Col, Divider, Modal, Row, Select, Table, Switch, InputNumber, Input, AutoComplete, Steps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/AddIcon";
import PdfIcon from "../../assets/PdfIcon";
import CargarCliente from "../../Clientes/Components/CargarCliente";
import { urlClientes, urlProductos, urlVentas } from "../../Generales/endpoints";
import { clienteModel } from "../../Models/clientes.model";
import { productoModel } from "../../Models/producto.model";
import { nuevoVentasModel, ventasCrear, ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import CargarProducto from "../../Productos/Components/CargarProducto";
import Button from "../../utils/Button";
import * as services from "../Services/ventas.services";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../utils/modal.css";
import TrashIcon from "../../assets/TrashIcon";
import FormaDePago from "./FormaDePago";
import Montos from "./Montos";
import PagoCredito from "./PagoCredito";
import Swal from "sweetalert2";
import "./ventaStyles.css";
import Circle from "../../assets/Circle";

export default function ListadoVentas(props: propsListadoVentas) {
  // const history = useHistory();
  const [openCliente, setOpenCliente] = useState(false);
  const [openProducto, setOpenProducto] = useState(false);
  const [openFormaDePago, setOpenFormaDePago] = useState(false);
  const [openVentaCf, setOpenVentaCf] = useState(false);

  const [productos, setProductos] = useState<productoModel[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<productoModel | null>();
  const [productosTabla1, setProductosTabla1] = useState<productoModel[]>([]);
  const [productosTabla2, setProductosTabla2] = useState<productoModel[]>([]);
  const [productosFiltro, setProductosFiltro] = useState<productoModel[]>([]);

  const [subTotal, setSubTotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  const [clientes, setCliente] = useState<clienteModel[]>([]);
  const [clientesAgregados, setClientesAgregados] = useState<number[]>([]);
  const [clienteSeleccionado, setClienteSeleccioando] = useState<clienteModel | null>();

  const [current, setCurrent] = useState(0);
  const [formadePago, setFormadePago] = useState<number>();

  //Modales
  const showCargarCliente = () => {
    setOpenCliente(!openCliente);
    props.setFlag();
  };

  const showCargarProducto = () => {
    setOpenProducto(!openProducto);
    props.setFlag();
  };

  const showCargarVenta = () => {
    setOpenFormaDePago(!openFormaDePago);
    props.setFlag();
  };

  const showCargarVentaCf = () => {
    setOpenVentaCf(!openVentaCf);
    props.setFlag();
  };

  function formatDate(fecha: string): string {
    var array = fecha.split("T");
    return array[0];
  }

  //Obtener productos y clientes

  useEffect(() => {
    async function traerProductos() {
      const result = await axios.get(`${urlProductos}`);
      setProductos(result.data);
    }
    traerProductos();
  }, []);

  useEffect(() => {
    async function traerClientes() {
      const result = await axios(`${urlClientes}`);
      setCliente(
        result.data.map((cliente: clienteModel) => ({
          value: cliente.id,
          label: cliente.nombreYApellido,
        }))
      );
    }
    traerClientes();
  }, []);

  async function selectCliente(id: number) {
    setClientesAgregados((clientesAgregados) => [...clientesAgregados, id]);
    const result = await axios(`${urlClientes}/${id}`);
    const cliente = result.data;
    setClienteSeleccioando(cliente);
    console.log(cliente);
  }

  //Tablas de productos

  const buscarProd = (value: string) => {
    if (value.length >= 3) {
      const filtrados = productos.filter((p) => p.nombre.toUpperCase().startsWith(value.toUpperCase()));
      setProductosFiltro(filtrados);
      setProductosTabla1(filtrados);
    } else {
      setProductosTabla1([]);
    }
  };

  function moverProductos(id: number) {
    const prod = productosTabla1.find((p) => p.id === id)!;

    setProductosTabla2([...productosTabla2, prod]);
    setProductosTabla1(productosTabla1.filter((p) => p.id !== id));
  }

  const cambiarCantidad = (id: number, cantidad: number) => {
    const newProductosTabla2 = productosTabla2.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad, precioF: producto.precio * cantidad };
      }
      return producto;
    });
    setProductosTabla2(newProductosTabla2);
    setSubTotal(calcularSubtotal(newProductosTabla2));
  };

  const quitarProducto = (id: number) => {
    const prod = productosTabla2.find((p) => p.id === id)!;

    setProductosTabla1([...productosTabla1, prod]);
    setProductosTabla2(productosTabla2.filter((p) => p.id !== id));
    setSubTotal(calcularSubtotal(productosTabla2.filter((p) => p.id !== id)));
  };

  const columnsTabla1 = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  const columnsTabla2 = [
    {
      title: "",
      key: "accion",
      render: (producto: productoModel) => (
        <Button className="btn btn-transparent" onClick={() => quitarProducto(producto.id)}>
          <TrashIcon />
        </Button>
      ),
    },
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      render: (cantidad: number, record: productoModel) => (
        <InputNumber
          defaultValue={1}
          min={1}
          max={productoSeleccionado?.cantidad}
          onChange={(value) => cambiarCantidad(record.id, value ? value : 1)}
        />
      ),
    },
    {
      title: "Precio Unitario",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Precio Final",
      dataIndex: "precioF",
      key: "precioF",
    },
  ];

  function exportPdf() {
    const doc = new jsPDF();
    doc.text("Lista de Productos", 10, 10);

    autoTable(doc, {
      head: [["Nombre", "Cantidad", "Precio Unitario", "Precio Final"]],
      body: productosTabla2.map((p) => [p.nombre, p.cantidad, p.precio, p.precioF]),
    });
    doc.save("presupuesto.pdf");
  }

  //Venta
  function calcularSubtotal(productos: productoModel[]) {
    return productos.reduce((suma, producto) => suma + producto.precioF, 0);
  }

  function calcularDescuento(porcentaje: number) {
    if (descuentoAplicado) {
      //para que se aplique descuento dependiendo de onClick
      setDescuento(0);
      setDescuentoAplicado(false);
    } else {
      const totalConDescuento = subTotal - subTotal * (porcentaje / 100);
      setDescuento(totalConDescuento);
      setDescuentoAplicado(true);
    }
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "",
      content: <FormaDePago formadePago={formadePago!} setFormaDePago={setFormadePago} onSuccess={next} />,
    },
    {
      title: "",
      content: formadePago === 3 ? <PagoCredito /> : <Montos montoAPagar={descuento || subTotal} formaDePago={formadePago!} />,
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

  async function finalizarVenta() {
    var arraygeneral = [];
    for (let i = 0; i < productosTabla2.length; i++) {
      arraygeneral[i] = [productosTabla2[i].id!, productosTabla2[i].cantidad!];
    }
    var venta: nuevoVentasModel = {
      clienteId: clienteSeleccionado!.id,
      productosIds: arraygeneral,
      formaDePago: formadePago!,
      tipoComprobante: "",
      iva: 0,
    };
    crear(venta);
  }
  function crear(venta: nuevoVentasModel) {
    console.log(venta);
    try {
      services.crear(venta);
      Swal.fire("Carga Correcta", "La venta fue cargada correctamente", "success");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <Row style={{ minHeight: "100vh" }}>
        <Col span={7} style={{ display: "flex" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoComplete
                placeholder="Cargar articulo"
                dropdownMatchSelectWidth={200}
                options={productosFiltro.map((p) => ({ value: p.id, label: p.nombre }))}
                style={{ width: 250 }}
                onSearch={buscarProd}
                open={false}
              ></AutoComplete>
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
                  <CargarProducto setFlagModal={showCargarProducto} setFlagListado={props.setFlag} />
                </p>
              </Modal>
            </div>
            <div className="container">
              {productosTabla1.length > 0 && (
                <Table
                  dataSource={productosTabla1}
                  columns={columnsTabla1}
                  showHeader={false}
                  pagination={{ pageSize: 5 }}
                  onRow={(productoTabla: productoModel) => {
                    return {
                      onClick: () => moverProductos(productoTabla.id),
                    };
                  }}
                />
              )}
            </div>
          </div>
          <Divider type="vertical" style={{ backgroundColor: "#33384D", height: "100vh", marginBlock: "10vh" }} />
        </Col>
        <Col span={12}>
          <div className="container">
            <h6>Articulos Cargados</h6>
            <Table dataSource={productosTabla2} columns={columnsTabla2} pagination={false} />
          </div>
          <Button onClick={() => exportPdf()} className="btn btn-transparent">
            <PdfIcon />
          </Button>
        </Col>

        <Col span={5} style={{ backgroundColor: "#F5F5F5", boxShadow: "-3px 0px 4px rgba(0, 0, 0, 0.25)" }}>
          <div className="container">
            <div
              className="container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Select
                showSearch
                onSelect={selectCliente}
                style={{ width: 200 }}
                placeholder="Seleccionar cliente"
                showArrow={false}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? "").includes(input)}
                filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                options={clientes}
              />
              <Button
                style={{}}
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
            <div className="container">
              <div className="container">
                <p>CONDICION</p>
                <div
                  style={{
                    marginInline: 30,
                    display: "flex",
                    alignItems: "middle",
                    justifyContent: "space-between",
                  }}
                >
                  <p>C.F</p>
                  <Switch style={{ backgroundColor: "#3B4256" }} />
                  <p>R.I</p>
                </div>
              </div>

              <Input placeholder="DNI/CUIT" value={clienteSeleccionado?.nroDocumento} />
              <Divider />
              <div>
                <p>Datos del Cliente</p>
                <Input
                  placeholder="Nombre/Razon Social"
                  value={
                    clienteSeleccionado?.nombreYApellido && clienteSeleccionado?.razonSocial
                      ? `${clienteSeleccionado?.nombreYApellido} / ${clienteSeleccionado?.razonSocial}`
                      : ""
                  }
                  key={clienteSeleccionado?.id}
                />
              </div>
              <Divider />
              <div>
                <p>Importe</p>
                <p>Subtotal: ${subTotal}</p>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-between ">
                  <Button
                    style={
                      descuentoAplicado
                        ? { background: "#fff", border: "1px solid #1DCA94", borderRadius: 5, color: "black" }
                        : { background: "#D9D9D9", border: "1px solid #000000", borderRadius: 5, color: "black" }
                    }
                    onClick={() => calcularDescuento(15)}
                  >
                    15%
                  </Button>
                  <Button
                    style={
                      descuentoAplicado
                        ? { background: "#fff", border: "1px solid #1DCA94", borderRadius: 5, color: "black" }
                        : { background: "#D9D9D9", border: "1px solid #000000", borderRadius: 5, color: "black" }
                    }
                    onClick={() => calcularDescuento(20)}
                  >
                    20%
                  </Button>
                  <Button
                    style={
                      descuentoAplicado
                        ? { background: "#fff", border: "1px solid #1DCA94", borderRadius: 5, color: "black" }
                        : { background: "#D9D9D9", border: "1px solid #000000", borderRadius: 5, color: "black" }
                    }
                    onClick={() => calcularDescuento(30)}
                  >
                    30%
                  </Button>
                </div>
                <div className="container mt-4">
                  <h6>IMPORTE TOTAL</h6>

                  <Input
                    style={{ backgroundColor: "white", color: "black", border: "3px solid #33384C", borderRadius: "7px" }}
                    disabled={true}
                    value={`$ ${descuento || subTotal}`}
                  ></Input>
                </div>
              </div>
              <div className="container mt-4">
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
                      {current === steps.length - 1 && <Button onClick={() => finalizarVenta()}>REALIZAR VENTA</Button>}
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

interface propsListadoVentas {
  ventas?: ventasModel[];
  ventasConsFinal?: ventasConsumidorFinalModel[];
  setFlag: () => void;
  onSuccess?: any;
}
{
  /* <>
                        <Tabs>
                            <Tabs.TabPane tab="Cliente Registrado" key="item-1">
                                <Ventas setFlagModal={showModal} setFlagListado={props.setFlag} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Consumidor Final" key="item-2">
                                <ConsumidorFinal setFlagModal={showModal} setFlagListado={props.setFlag} />
                            </Tabs.TabPane>
                        </Tabs>
                    </> */
}
