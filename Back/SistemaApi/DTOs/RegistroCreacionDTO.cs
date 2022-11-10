using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class RegistroCreacionDTO
    {
        [Required]
        public string Nombre { get; set; }
        [EmailAddress] 
        public string Email { get; set; }
        [Required]
        public string Password { get; set; } 
        public string Role { get; set; }
    }
}
