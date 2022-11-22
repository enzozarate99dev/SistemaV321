using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Producto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
        public double Precio { get; set; }
        public int Cantidad { get; set; }
        public string Codigo { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public string? Foto { get; set; }
        public List<VentaProducto> VentaProducto { get; set; }
        public List<VentaCFProducto> VentaCFProducto { get; set; }
        public List<PresupuestoProducto> PresupuestoProducto { get; set; }
        public List<CompraProducto> CompraProducto { get; set; }
    }
}
