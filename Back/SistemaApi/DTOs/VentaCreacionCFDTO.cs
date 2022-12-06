using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionCFDTO
    {
        public string NombreCliente { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int[]>>))]
        public List<int[]> ProductosIds { get; set; }
        public int FormaDePago { get; set; }
        public double Iva { get; set; }
        public string TipoComprobante { get; set; }
    }
}
