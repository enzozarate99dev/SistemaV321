using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Venta
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public double? PrecioTotal { get; set; }
        [Required]
        public DateTime FechaDeVenta { get; set; }
        public string FormaDePago { get; set; }
        public double Adeudada { get; set; }
        public List<VentaProducto> VentaProducto { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}
