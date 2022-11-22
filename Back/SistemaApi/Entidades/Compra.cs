using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Compra
    {
        public int Id { get; set; }
        public int ProveedorId { get; set; }
        public double? PrecioTotal { get; set; }
        [Required]
        public DateTime FechaDeCompra { get; set; }
        public List<CompraProducto> CompraProducto { get; set; }
        public virtual Proveedor Proveedor { get; set; }
    }
}
