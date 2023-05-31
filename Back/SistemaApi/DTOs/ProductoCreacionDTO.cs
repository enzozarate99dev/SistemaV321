using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ProductoCreacionDTO
    {
        [Required]
        [StringLength(maximumLength:100)]
        public string Nombre { get; set; }
        public int  SucursalId { get; set; }

        public double Precio { get; set; }
        public int Cantidad { get; set; }
        public string Codigo { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public IFormFile? Foto { get; set; }
    }
}
