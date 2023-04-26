import React from "react";
import { Divider, MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import UserIcon from "../assets/UserIcon";
import ShopIcon from "../assets/ShopIcon";
import UserIconSidebar from "../assets/UserIconSidebar";
import BoxIcon from "../assets/BoxIcon";
import DocsIcon from "../assets/DocsIcon";
import Autorizado from "../auth/Autorizado";
import { Link } from "react-router-dom";
import "./miLayout.css";
import UsersIcon from "../assets/UsersIcon";

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
          <Menu className="menu" style={{ backgroundColor: "#33384D" }} items={items} inlineCollapsed={false} />

          {/* <Autorizado
            autorizado={
              <>
                <Menu className="menu" style={{ backgroundColor: "#33384D" }} items={items} inlineCollapsed={false} />
              </>
            }
            noAutorizado={<Menu className="menu" style={{ backgroundColor: "#33384D" }} items={items} inlineCollapsed={false} />}
          /> */}
        </>
      }
      <Layout className="site-layout">
        <Content
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <div>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
