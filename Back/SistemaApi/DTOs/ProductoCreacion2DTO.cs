using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ProductoCreacion2DTO
    {
        [Required]
        [StringLength(maximumLength: 100)]
        public string Nombre { get; set; }
        public string Precio { get; set; }
        public string Cantidad { get; set; }
        public string Codigo { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public IFormFile? Foto { get; set; }
    }
}
