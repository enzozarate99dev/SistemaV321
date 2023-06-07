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

const { Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: (
      <Link to="/ventas/generar" className="menu-icon">
        <ShopIcon />
      </Link>
    ),
  },

  {
    key: "2",
    icon: (
      <Link to="/listadoClientes" className="menu-icon">
        <UserIconSidebar />
      </Link>
    ),
  },
  {
    key: "3",
    icon: (
      <Link to="/listadoProductos" className="menu-icon">
        <BoxIcon />
      </Link>
    ),
  },
  {
    key: "4",
    icon: (
      <Link to="/listadoVentas" className="menu-icon">
        <DocsIcon />
      </Link>
    ),
  },
  {
    key: "5",
    icon: (
      <Link to="/listadoUsuarios" className="menu-icon">
        <UsersIcon />
      </Link>
    ),
  },
];

export default function MiLayout(props: MenuProps) {
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      {
        <>
          {/* <Autorizado
            autorizado={<Menu className="menu" style={{ backgroundColor: "#33384D" }} items={items} />}
            noAutorizado={<Menu className="menu" style={{ backgroundColor: "#33384D" }} items={[]} />}
          ></Autorizado> */}
          <Menu className="menu " style={{ backgroundColor: "#33384D" }} items={items} />
        </>
      }

      <Layout className="site-layout ">
        <Header className="header">
          <MenuNavbar />
        </Header>
        <Content
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
            minHeight: "100vh",
          }}
        >
          <div>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
