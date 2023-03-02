using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionDTO
    {
        
        public int ClienteId { get; set; }
        public ICollection<VentaLineCreacionDTO> VentaLinesCreacion { get; set; }
      /* public ICollection<VentaOrderCreacionDTO> VentaOrdersCreacion { get; set;  }*/
        public ICollection<PagoCreacionDTO> Pagos { get; set; }
    }
}
