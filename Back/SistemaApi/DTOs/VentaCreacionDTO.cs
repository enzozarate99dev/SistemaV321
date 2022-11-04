using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionDTO
    {
        [Required(ErrorMessage = "El campo {0} es requerido")]
        public string NombreCliente { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int[]>>))]
        public List<int[]> ProductosIds { get; set; }
        public string FormaDePago { get; set; }
    }
}
