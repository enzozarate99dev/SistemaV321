using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Pago
    {
        [Key]
        public int Id_pago { get; set; }
        public double Importe { get; set; }
        public DateTime Fecha { get; set; }
        public string MetodoDePago { get; set; }
        public List<VentaOrderPago> VentaOrderPagos { get; set; }


    }
}
