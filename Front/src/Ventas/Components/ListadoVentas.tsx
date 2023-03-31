import { Col, Divider, Modal, Row, Select, Table, Switch, Input, AutoComplete } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/AddIcon";
import PdfIcon from "../../assets/PdfIcon";
import CargarCliente from "../../Clientes/Components/CargarCliente";
import { urlClientes, urlProductos } from "../../Generales/endpoints";
import { clienteModel } from "../../Models/clientes.model";
import { productoModel } from "../../Models/producto.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import CargarProducto from "../../Productos/Components/CargarProducto";
import Button from "../../utils/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../utils/modal.css";
import TrashIcon from "../../assets/TrashIcon";
import "./ventaStyles.css";
import RealizarVenta from "./RealizarVenta";
import InputVentas from "../../utils/InputVentas";
import ButtonDescuento from "../../utils/ButtonDescuento";
import { relative } from "path";

export default function ListadoVentas(props: propsListadoVentas) {
  const [openCliente, setOpenCliente] = useState(false);
  const [openProducto, setOpenProducto] = useState(false);

  const [productos, setProductos] = useState<productoModel[]>([]);
  const [productosTabla1, setProductosTabla1] = useState<productoModel[]>([]);
  const [productosTabla2, setProductosTabla2] = useState<productoModel[]>([]);
  const [productosFiltro, setProductosFiltro] = useState<productoModel[]>([]);

  const [subTotal, setSubTotal] = useState(0);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [porcentajeBotonSeleccionado, setPorcentajeBotonSeleccionado] = useState(0);

  const [clientes, setCliente] = useState<clienteModel[]>([]);
  const [clientesAgregados, setClientesAgregados] = useState<number[]>([]);
  const [clienteSeleccionado, setClienteSeleccioando] = useState<clienteModel | null>();

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
          value: cliente.id_cliente,
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
        <Button className="btn btn-transparent" onClick={() => quitarProducto(producto.id_producto)}>
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
      render: (cantidad: number, prod: productoModel) => (
        <>
          {/* <InputNumber defaultValue={1} onChange={(e) => cambiarCantidad(prod.id_producto, e ? e : 1)} /> */}
          <InputVentas cambiarCantidad={cambiarCantidad} prod={prod} cantidad={prod.cantidad} />
        </>
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

  /* proximos cambios: crear componente para el input de cantidades */

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
    return productos.reduce((suma, producto) => suma + producto.precioF!, 0);
  }

  function calcularDescuento(porcentaje: number) {
    if (descuentoAplicado && porcentaje === porcentajeBotonSeleccionado) {
      //para que se aplique descuento dependiendo de onClick
      setTotalConDescuento(subTotal);
      setDescuentoAplicado(false);
      setPorcentajeBotonSeleccionado(0);
    } else {
      const totalConDescuento = subTotal - subTotal * (porcentaje / 100);
      setTotalConDescuento(totalConDescuento);
      setDescuentoAplicado(true);
      setPorcentajeBotonSeleccionado(porcentaje);
    }
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <Row className="my-row">
          <Col lg={7} md={19} style={{ display: "flex" }} className="col1">
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
                  options={productosFiltro.map((p) => ({ value: p.id_producto, label: p.nombre }))}
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
                        onClick: () => moverProductos(productoTabla.id_producto),
                      };
                    }}
                  />
                )}
              </div>
            </div>
            <Col md={0} lg={1}>
              <Divider type="vertical" style={{ backgroundColor: "#33384D", height: "100vh", marginBlock: "10vh" }} />
            </Col>
          </Col>
          <Col lg={12} className="col2" md={19}>
            <div className="container">
              <h6>Articulos Cargados</h6>
              <Table dataSource={productosTabla2} columns={columnsTabla2} pagination={false} />
            </div>
            <Button
              onClick={() => exportPdf()}
              className="btn btn-transparent d-flex  justify-content-start "
              style={{
                backgroundColor: "#F5F5F5",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: 7,
                width: 80,
                height: 50,
              }}
            >
              <div
                className="d-flex flex-column justify-content-center align-items-center  "
                style={{ position: "relative", width: "100%", height: "100%", margin: 0 }}
              >
                <PdfIcon />
                <p style={{ fontSize: 10, margin: 0, textAlign: "center" }}>Presupuesto</p>
              </div>
            </Button>
          </Col>

          <Col
            lg={{ push: 0, pull: 0 }}
            md={5}
            style={{
              backgroundColor: "#F5F5F5",
              boxShadow: "-3px 0px 4px rgba(0, 0, 0, 0.25)",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              minHeight: "100vh",
            }}
            className="col3"
          >
            <div className="container">
              <div className="container d-flex justify-content-center align-items-center">
                <Select
                  showSearch
                  onSelect={selectCliente}
                  style={{ width: "80%" }}
                  placeholder="Seleccionar cliente"
                  showArrow={false}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? "").includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                  }
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
              <div className="container">
                <div className="d-flex flex-column justify-content-center ">
                  <p>CONDICION</p>
                  <div
                    className="mx-1 mx-lg-5 my-2"
                    style={{
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
                    key={clienteSeleccionado?.id_cliente}
                  />
                </div>
                <Divider />
                <div>
                  <p>Importe</p>
                  <p>Subtotal: ${subTotal}</p>
                </div>
                <div className="mt-4">
                  <div className="d-flex flex-wrap justify-content-center  ">
                    <ButtonDescuento calcularDescuento={calcularDescuento} valor={15} porcentaje={porcentajeBotonSeleccionado} />
                    <ButtonDescuento calcularDescuento={calcularDescuento} valor={20} porcentaje={porcentajeBotonSeleccionado} />
                    <ButtonDescuento calcularDescuento={calcularDescuento} valor={30} porcentaje={porcentajeBotonSeleccionado} />
                  </div>
                  <div className="container mt-4">
                    <h6>IMPORTE TOTAL</h6>

                    <Input
                      style={{ backgroundColor: "white", color: "black", border: "3px solid #33384C", borderRadius: "7px" }}
                      disabled={true}
                      value={`$ ${totalConDescuento || subTotal}`}
                    ></Input>
                  </div>
                </div>
                <div className="container mt-4">
                  <RealizarVenta
                    setFlag={handleFlag}
                    productos={productosTabla2}
                    montoAPagar={totalConDescuento || subTotal}
                    clientes={clienteSeleccionado}
                    descuento={porcentajeBotonSeleccionado}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

interface propsListadoVentas {
  ventas?: ventasModel[];
  ventasConsFinal?: ventasConsumidorFinalModel[];
  setFlag: () => void;
  onSuccess?: any;
}
