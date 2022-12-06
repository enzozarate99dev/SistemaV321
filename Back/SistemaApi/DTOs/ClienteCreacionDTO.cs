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
        public string CodigoPostal { get; set; }
        public string Localidad { get; set; }
        public string NroDocumento { get; set; }
        public bool PercibeIIBB { get; set; }
        public bool PercibeIVA { get; set; }
        public string Provincia { get; set; }
        public string RazonSocial { get; set; }
        public int TipoDocumento { get; set; }
    }
}
