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
        public int FormaDePago { get; set; }
        public int TratamientoImpositivo { get; set; }
        public string TipoComprobante { get; set; }
        public double Iva { get; set; }
    }
}
