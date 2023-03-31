import Button from "./Button";

export default function ButtonDescuento({ porcentaje, calcularDescuento, valor }: buttonDescuentoProps) {
  return (
    <div style={{ marginInline: "1%" }}>
      <Button
        style={{
          backgroundColor: porcentaje === valor ? "#fff" : "#D9D9D9",
          border: porcentaje === valor ? "1px solid #1DCA94" : "1px solid #000000",
          borderRadius: 5,
          color: "black",
          marginBottom: "10%",
        }}
        onClick={() => calcularDescuento(valor)}
      >
        {valor}%
      </Button>
    </div>
  );
}
interface buttonDescuentoProps {
  porcentaje: number;
  calcularDescuento: (p: number) => void;
  valor: number;
}
