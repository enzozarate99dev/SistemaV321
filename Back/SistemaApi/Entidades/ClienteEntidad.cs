using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class ClienteEntidad
    {
        public int Id { get; set; }
        [Required]
        public string NombreYApellido { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Domicilio { get; set; }
        public string CodigoPostal { get; set; }
        public string Localidad { get; set; }
        public string NroDocumento { get; set; }
        public bool PercibeIIBB { get; set; }
        public bool PercibeIVA { get; set; }
        public string Provincia { get; set; }
        public string RazonSocial { get; set; }
        public int TipoDocumento { get; set; }
        public double? Deuda { get; set; }
        public virtual ICollection<Venta> Ventas { get; set; }
    }
}
