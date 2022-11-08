using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class VentaConsumidorFinalDTO
    {
        public int Id { get; set; }
        public string NombreCliente { get; set; }
        public double? PrecioTotal { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public string FormaDePago { get; set; }
        public List<ProductoDTO> Productos { get; set; }
    }
}
