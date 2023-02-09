using SistemaApi.Utilidades;
using Microsoft.AspNetCore.Mvc;
using SistemaApi.Entidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaDTO
    {
        
        public int Id_venta { get; set; }
        public int Id_cliente { get; set; }
        public double PrecioTotal { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public int TratamientoImpositivo { get; set; }
        public double Adeudada { get; set; }
        public List<VentaLineDTO> VentaLines { get; set; }
        public List<VentaOrderDTO> ? VentaOrders { get; set; }
    }
}
