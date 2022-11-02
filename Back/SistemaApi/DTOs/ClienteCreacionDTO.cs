using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ClienteCreacionDTO
    {
        [Required]
        public string NombreYApellido { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Domicilio { get; set; }
    }
}
