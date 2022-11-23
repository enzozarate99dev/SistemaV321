using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class CompraDTO
    {
        public int Id { get; set; }
        public int ProveedorId { get; set; }
        public double? PrecioTotal { get; set; }
        [Required]
        public DateTime FechaDeCompra { get; set; }
        public List<ProductoDTO> Productos { get; set; }
    }
}
