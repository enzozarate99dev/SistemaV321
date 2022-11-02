using SistemaApi.Utilidades;
using Microsoft.AspNetCore.Mvc;


namespace SistemaApi.DTOs
{
    public class VentaDTO
    {
        public int Id { get; set; }
        public double? PrecioTotal { get; set; }
        public string NombreCliente { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public List<ProductoDTO> Productos { get; set; }
    }
}
