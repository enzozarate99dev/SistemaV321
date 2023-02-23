using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionDTO
    {
        
        public int ClienteId { get; set; }
       /* public double Total { get; set; }*/
        public ICollection<VentaLineCreacionDTO> VentaLines { get; set; }

    }
}
