using SistemaApi.Utilidades;
using Microsoft.AspNetCore.Mvc;
using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class VentaDTO
    {
        public int Id { get; set; }
        public double? PrecioTotal { get; set; }
        public int ClienteId { get; set; }
        public string FormaDePago { get; set; }
        public double Adeudada { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public List<ProductoDTO> Productos { get; set; }
    }
}
