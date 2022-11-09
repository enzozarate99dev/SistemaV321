using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class PresupuestoCreacionDTO
    {
        public string Nombre { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int[]>>))]
        public List<int[]> ProductosIds { get; set; }
        public double Descuento { get; set; }
    }
}
