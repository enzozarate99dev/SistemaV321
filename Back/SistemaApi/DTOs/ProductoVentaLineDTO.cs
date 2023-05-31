using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ProductoVentaLineDTO
    {
        [Key]
        public int Id_producto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Codigo { get; set; }
        public int  SucursalId { get; set; }

        public double Precio { get; set; }
    }
}
