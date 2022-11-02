using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Venta
    {
        public int Id { get; set; }
        public double? PrecioTotal { get; set; }
        [Required]
        public string NombreCliente { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public List<VentaProducto> VentaProducto { get; set; }

        public static implicit operator Venta(List<Venta> v)
        {
            throw new NotImplementedException();
        }
    }
}
