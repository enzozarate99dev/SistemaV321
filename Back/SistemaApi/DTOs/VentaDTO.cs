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
        public int FormaDePago { get; set; }
        public int TratamientoImpositivo { get; set; }
        public string TipoComprobante { get; set; }
        public int IdComprobante { get; set; }
        public int ConfirmacionAfip { get; set; }
        public double Adeudada { get; set; }
        public DateTime FechaDeVenta { get; set; }      
        public List<ProductoDTO> Productos { get; set; }
        public ClienteDTO Cliente { get; set; }
    }
}
