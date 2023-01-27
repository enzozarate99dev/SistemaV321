import TarjetaCredito from "../../assets/TarjetaCredito";
import Button from "../../utils/Button";

export default function PagoCredito() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        <Button
          className="btn btn-transparent m-2"
          style={{
            backgroundColor: "#FBFBFB",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 10,
            color: "#6A7580",
          }}
          onClick={() => {}}
        >
          <div>1 S/INTERÉS</div>
          <TarjetaCredito />
        </Button>
        <Button
          className="btn btn-transparent m-2"
          style={{
            backgroundColor: "#FBFBFB",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 10,
            color: "#6A7580",
          }}
          onClick={() => {}}
        >
          <div>3 (S - C)/INTERÉS</div>
          <TarjetaCredito />
        </Button>
        <Button
          className="btn btn-transparent m-2"
          style={{
            backgroundColor: "#FBFBFB",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 10,
            color: "#6A7580",
          }}
          onClick={() => {}}
        >
          <div>6 (S - C)/INTERÉS</div>
          <TarjetaCredito />
        </Button>
      </div>
    </>
  );
}
