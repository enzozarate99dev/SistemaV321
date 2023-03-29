using SistemaApi.Entidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentasClienteDTO
    {
        [Key]
        public int Id_venta { get; set; }
        public int ClienteId { get; set; }
        public virtual ClienteEntidad Cliente { get; set; }
        public double? PrecioTotal { get; set; }
        [Required]
        public DateTime FechaDeVenta { get; set; }
        public int TratamientoImpositivo { get; set; }
        public string TipoComprobante { get; set; }  
        public double Adeudada { get; set; }
        public bool Pagada { get; set; }
       
    }
}
