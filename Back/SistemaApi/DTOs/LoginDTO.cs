using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class LoginDTO
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
