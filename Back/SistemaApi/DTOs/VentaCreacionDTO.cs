using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionDTO
    {
        public int ClienteId { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int[]>>))]
        public List<int[]> ProductosIds { get; set; }
        public string FormaDePago { get; set; }
    }
}
