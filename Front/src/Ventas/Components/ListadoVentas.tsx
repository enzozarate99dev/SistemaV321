import { RightCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Modal,
  Row,
  Select,
  Table,
  Switch,
  InputNumber,
  Input,
} from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/AddIcon";
import PdfIcon from "../../assets/PdfIcon";
import ShopIcon from "../../assets/ShopIcon";
import CargarCliente from "../../Clientes/Components/CargarCliente";
import { urlClientes, urlProductos } from "../../Generales/endpoints";
import { clienteModel } from "../../Models/clientes.model";
import { productoModel } from "../../Models/producto.model";
import { ventasModel } from "../../Models/ventas.model";
import { ventasConsumidorFinalModel } from "../../Models/ventasCf.model";
import CargarProducto from "../../Productos/Components/CargarProducto";
import Button from "../../utils/Button";
import * as servicesCf from "../../VentasConsFinal/Services/consumidorFinal.services";
import * as services from "../Services/ventas.services";

export default function ListadoVentas(props: propsListadoVentas) {
  // const history = useHistory();
  const [open, setOpen] = useState(false);
  // const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoCF, setInfoCF] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<number>();
  // const showEdit = () => {
  //   setEdit(!edit);
  // };

  const showModal = () => {
    setOpen(!open);
    props.setFlag();
  };

  // const showInfo = () => {
  //   setInfo(!info);
  // };

  // const showInfoCF = () => {
  //   setInfoCF(!infoCF);
  // };

  const [productos, setProductos] = useState<productoModel[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<productoModel | null>();
  const [productosAgregados, setProductosAgregados] = useState<number[]>([]);
  const [productoTabla, setProductoTabla] = useState<productoModel[]>([]);
  const [productosTabla2, setProductosTabla2] = useState<productoModel[]>([]);
  const [clientes, setCliente] = useState<clienteModel[]>([]);
  const [clienteSeleccionado, setClienteSeleccioando] =
    useState<clienteModel>();

  useEffect(() => {
    async function traerProductos() {
      const result = await axios(`${urlProductos}`);
      setProductos(
        result.data.map((producto: productoModel) => ({
          value: producto.id,
          label: producto.nombre,
        }))
      );
    }
    traerProductos();
  }, []);

  useEffect(() => {
    async function traerClientes() {
      const result = await axios(`${urlClientes}`);
      setCliente(
        result.data.map((cliente: clienteModel) => ({
          ...cliente,
          label: cliente.nombreYApellido,
        }))
      );
    }
    traerClientes();
  }, []);

  async function selectProducto(id: number) {
    if (productosAgregados.includes(id)) {
      return;
    }
    setProductosAgregados((productosAgregados) => [...productosAgregados, id]);
    const result = await axios(`${urlProductos}/${id}`);
    const producto = result.data;
    setProductoSeleccionado(producto);
    setProductoTabla((productoTabla) => [...productoTabla, producto]);
    console.log(result.data);
  }

  const selectCliente = (cliente: clienteModel) => {
    setClienteSeleccioando(cliente);
    console.log(cliente);
  };

  const handleClick = () => {
    setProductosTabla2([...productosTabla2, ...productoTabla]);
    setProductoTabla([]);
  };

  const cambiarCantidad = (id: number, cantidad: number) => {
    const newProductosTabla2 = productosTabla2.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad, precioF: producto.precio * cantidad };
      }
      return producto;
    });
    setProductosTabla2(newProductosTabla2);
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
      key: "precio",
    },
  ];

  return (
    <>
      <Row>
        <Col span={7}>
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Select
                showSearch
                onSelect={(id) => selectProducto(id)}
                showArrow={false}
                style={{ width: 200 }}
                placeholder="Cargar articulo"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                listItemHeight={30}
                listHeight={90}
                options={productos}
              />
              <Button
                style={{}}
                onClick={() => {
                  showModal();
                }}
                className="btn btn-transparent"
              >
                <AddIcon />
              </Button>
              <Modal
                title="Cargar Producto"
                width={1150}
                open={open}
                footer={null}
                centered
                onCancel={showModal}
              >
                <p>
                  <CargarProducto
                    setFlagModal={showModal}
                    setFlagListado={props.setFlag}
                  />
                </p>
              </Modal>
            </div>
            <div className="container">
              {productoTabla.length > 0 && (
                <Table
                  dataSource={productoTabla}
                  columns={columnsTabla1}
                  showHeader={false}
                  pagination={false}
                />
              )}
              <Button onClick={handleClick} className="btn btn-transparent">
                <RightCircleOutlined />
              </Button>
            </div>
          </div>
        </Col>
        {/* <Divider
          type="vertical"
          style={{ backgroundColor: "black", height: "100vh" }}
        /> */}
        <Col span={12}>
          <h5>Articulos Cargados</h5>
          <Table
            dataSource={productosTabla2}
            columns={columnsTabla2}
            pagination={false}
          />
          <Button onClick={() => {}} className="btn btn-transparent">
            <PdfIcon />
          </Button>
        </Col>

        <Col span={5} style={{ backgroundColor: "#F5F5F5" }}>
          <div className="container">
            <div
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
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={clientes}
              />
              <Button
                style={{}}
                onClick={() => {
                  showModal();
                }}
                className="btn btn-transparent"
              >
                <AddIcon />
              </Button>
              <Modal
                title="Cargar Cliente"
                width={1150}
                open={open}
                footer={null}
                centered
                onCancel={showModal}
              >
                <p>
                  <CargarCliente
                    setFlagModal={showModal}
                    setFlagListado={props.setFlag}
                  />
                </p>
              </Modal>
            </div>
            <div>
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
              <Input
                placeholder="DNI/CUIT"
                value={clienteSeleccionado?.nroDocumento}
              />
              <Divider />
              <div>
                <p>Datos del Cliente</p>
                <Input
                  placeholder="Nombre/Razon Social"
                  value={clienteSeleccionado?.nombreYApellido}
                  key={clienteSeleccionado?.id}
                />
              </div>
              <Divider />
              <div>
                <p>Importe</p>
                <p>Subtotal</p>
              </div>
              <div>
                <h6>IMPORTE TOTAL</h6>
              </div>
              <Button>Pagar</Button>
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
}

// async function borrar(id: number) {
//   try {
//     services.borrar(id);
//     props.setFlag();
//   } catch (error) {
//     console.log(error.response.data);
//   }
// }

// async function borrarCF(id: number) {
//   try {
//     servicesCF.borrar(id);
//     props.setFlag();
//   } catch (error) {
//     console.log(error.response.data);
//   }
// }

// function formatDate(fecha: string): string {
//   var array = fecha.split("T");
//   return array[0];
// }

// function getPDF(id: number, tipo: string) {
//   if (tipo == "cf") {
//     const res = servicesCF.getPDF(id);
//     res.then((resp: AxiosResponse<string>) => {
//       window.open(resp.data);
//     });
//   } else {
//     const res = services.getPDF(id);
//     res.then((resp: AxiosResponse<string>) => {
//       window.open(resp.data);
//     });
//   }
// }

// const botones = (id: number) => (
//   <>
//     <Button
//       style={{ marginRight: "1rem" }}
//       className="btn btn-info"
//       onClick={() => {
//         showInfo();
//         setId(id);
//       }}
//     >
//       Detalle
//     </Button>
//     <Button
//       onClick={() => confirmar(() => borrar(id))}
//       className="btn btn-transparent"
//     >
//       <TrashIcon />
//     </Button>
//     <Button onClick={() => getPDF(id, "")} className="btn btn-transparent">
//       <PdfIcon />
//     </Button>
//   </>
// );

// const botonesCF = (id: number) => (
//   <>
//     <Button
//       style={{ marginRight: "1rem" }}
//       className="btn btn-info"
//       onClick={() => {
//         showInfoCF();
//         setId(id);
//       }}
//     >
//       Detalle
//     </Button>
//     <Button
//       onClick={() => confirmar(() => borrarCF(id))}
//       className="btn btn-transparent"
//     >
//       <TrashIcon />
//     </Button>
//     <Button onClick={() => getPDF(id, "cf")} className="btn btn-transparent">
//       <PdfIcon />
//     </Button>
//   </>
// );

{
  /* 
      <Modal
        title="Cargar Venta"
        width={1150}
        open={open}
        footer={null}
        centered
        onCancel={showModal}
      >
        <p>
          <>
            <Tabs>
              <Tabs.TabPane tab="Cliente Registrado" key="item-1">
                <Ventas
                  setFlagModal={showModal}
                  setFlagListado={props.setFlag}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Consumidor Final" key="item-2">
                <ConsumidorFinal
                  setFlagModal={showModal}
                  setFlagListado={props.setFlag}
                />
              </Tabs.TabPane>
            </Tabs>
          </>
        </p>
      </Modal>
      <Modal
        title="Informacion del cliente"
        width={1150}
        open={info}
        footer={null}
        centered
        onCancel={showInfo}
      >
        <p>
          <DetalleVentas
            id={id!}
            setFlagModal={showInfo}
            setFlagListado={props.setFlag}
          />
        </p>
      </Modal>
      <Modal
        title="Informacion del cliente"
        width={1150}
        open={infoCF}
        footer={null}
        centered
        onCancel={showInfoCF}
      >
        <p>
          <DetalleVentasCF
            id={id!}
            setFlagModal={showInfoCF}
            setFlagListado={props.setFlag}
          />
        </p>
</Modal> */
}
