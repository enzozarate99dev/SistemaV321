using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class MetodoDePagoDTO
    {
        [Key]
        public int Id_metodo { get; set; }
        public string NombreMetodo { get; set; }
    }
}
