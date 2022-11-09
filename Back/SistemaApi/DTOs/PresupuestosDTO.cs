using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class PresupuestosDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double? PrecioTotal { get; set; }
        public double Descuento { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public List<ProductoDTO> Productos { get; set; }
    }
}
