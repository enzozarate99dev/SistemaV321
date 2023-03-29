using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaPagosDTO
    {
        [Key]
        public int Id_venta { get; set; }
        public int ClienteId { get; set; }
        public double? PrecioTotal { get; set; }       
        public DateTime FechaDeVenta { get; set; }
        public int TratamientoImpositivo { get; set; }
        public string TipoComprobante { get; set; }    
        public bool Pagada { get; set; }
      
    }
}
