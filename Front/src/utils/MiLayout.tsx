import { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import ShopIcon from "../assets/ShopIcon";
import UserIconSidebar from "../assets/UserIconSidebar";
import BoxIcon from "../assets/BoxIcon";
import DocsIcon from "../assets/DocsIcon";
import { Link } from "react-router-dom";
import "./miLayout.css";
import UsersIcon from "../assets/UsersIcon";
import { Header } from "antd/es/layout/layout";
import MenuNavbar from "./MenuNavbar";
import "../Configuration/modelColors.css";
import Autorizado from "../auth/Autorizado";
import Sider from "antd/es/layout/Sider";

const { Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Caja",
    "1",
    <Link to="/ventas/generar" className="menu-icon">
      <ShopIcon />
    </Link>
  ),
  getItem(
    "Clientes",
    "2",
    <Link to="/listadoClientes" className="menu-icon">
      <UserIconSidebar />
    </Link>
  ),
  getItem(
    "Artículos",
    "3",
    <Link to="/listadoProductos" className="menu-icon">
      <BoxIcon />
    </Link>
  ),
  getItem(
    "Facturas",
    "4",
    <Link to="/listadoVentas" className="menu-icon">
      <DocsIcon />
    </Link>
  ),
  getItem(
    "Usuarios",
    "5",
    <Link to="/listadoUsuarios" className="menu-icon">
      <UsersIcon />
    </Link>
  ),
];

export default function MiLayout(props: MenuProps) {
  return (
    <Layout hasSider style={{}}>
      <Sider collapsed={true} style={{ height: "100vh", backgroundColor: "#33384D", position: "fixed", zIndex: 20 }}>
        <Menu className="menu " style={{ backgroundColor: "#33384D", marginTop: "50%" }} items={items} />
      </Sider>

      <Layout className="site-layout ">
        <Header className="header" style={{ position: "fixed", width: "100vw", zIndex: 100 }}>
          <MenuNavbar />
        </Header>
        <Content
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
            paddingLeft: "80px",
            minHeight: "100vh",
            paddingTop: 64,
          }}
        >
          <div>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
