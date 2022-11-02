using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Cliente
    {
        public int Id { get; set; }
        [Required]
        public string NombreYApellido { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Domicilio { get; set; }
    }
}
