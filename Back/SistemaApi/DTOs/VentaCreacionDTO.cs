using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionDTO
    {
        
        public int Id_cliente { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public double TratamientoImpositivo { get; set; }
        public ICollection<VentaLineCreacionDTO> VentaLines { get; set; }
        public ICollection<VentaOrderCreacionDTO> ? VentaOrders { get; set; }

    }
}
