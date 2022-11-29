using Microsoft.EntityFrameworkCore;
using SistemaApi.Entidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ClienteDTO
    {
        public int Id { get; set; }
        public string NombreYApellido { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Domicilio { get; set; }
        public double? Deuda { get; set; }
    }
}
