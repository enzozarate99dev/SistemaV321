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

const { Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: (
      <Link to="/listadoVentas" className="menu-icon">
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
      <Link to="/" className="menu-icon">
        <DocsIcon />
      </Link>
    ),
  },
].map((item) => item);

export default function MiLayout(props: MenuProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Autorizado
        autorizado={
          <>
            <Menu
              className="menu"
              style={{ backgroundColor: "#33384D" }}
              items={items}
              inlineCollapsed={false}
            />
          </>
        }
      />

      <Layout className="site-layout">
        <Content>
          <div
            style={{
              height: "100vh",
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
