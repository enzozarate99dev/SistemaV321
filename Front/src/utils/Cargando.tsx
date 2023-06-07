import { Spin } from "antd";

export default function Cargando() {
  return (
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  );
}
