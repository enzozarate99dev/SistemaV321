using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class PagoDTO
    {
        [Key]
        public int Id_pago { get; set; }
        public double Importe { get; set; }
        public DateTime Fecha { get; set; }
        public List<MetodoDePagoDTO> MetodosDePago { get; set; }
    }
}
