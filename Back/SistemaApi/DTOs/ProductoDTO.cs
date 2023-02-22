using SistemaApi.Entidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ProductoDTO
    {
        [Key]
        public int Id_producto { get; set; }
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
        public double Precio { get; set; }
        public int Cantidad { get; set; }
        public string Codigo { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public string? Foto { get; set; }
       
    }
}
