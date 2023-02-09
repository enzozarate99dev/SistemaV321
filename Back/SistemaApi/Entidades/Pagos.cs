using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades

{
    public class Pagos
    {
        [Key]
        public int Id_pago { get; set; }
        public double PrecioTotal { get; set; }
        public DateTime FechaDePago { get; set; }
        public ICollection<MetodoDePago> MetodosDePago { get; set; }
        public ICollection<VentaOrderPago> Venta_Order_Pagos { get; set; }

    }

}
