using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;

namespace SistemaApi.DTOs
{
    public class PagoCreacionDTO
    {
        public double Importe { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> MetodosDePagoIds { get; set; }
    }
}
