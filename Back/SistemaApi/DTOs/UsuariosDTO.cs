using SistemaApi.Entidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class UsuariosDTO
    {
        [Key]
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int SucursalId { get; set; }
    }
}
