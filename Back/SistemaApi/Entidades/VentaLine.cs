using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class VentaLine
    {
        [Key]
        public int Id_venta_line { get; set; }
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public double PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
        public double Iva { get; set; }
        public virtual Venta Venta { get; set; }
        public virtual Producto Productos { get; set; }

    }
}
