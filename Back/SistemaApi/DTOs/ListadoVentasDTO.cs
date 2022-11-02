using Microsoft.AspNetCore.Authentication;
using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class ListadoVentasDTO
    {
        public List<VentaDTO> Ventas { get; set; }
    }
}
