using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Venta
    {
        [Key]
        public int Id_venta { get; set; }
        public int Id_cliente { get; set; }
        public double? PrecioTotal { get; set; }
        [Required]
        public DateTime FechaDeVenta { get; set; }
      /*  public int FormaDePago { get; set; }*/
        public int TratamientoImpositivo { get; set; }
       /* public string TipoComprobante { get; set; }
        public int IdComprobante { get; set; }
        public int ConfirmacionAfip { get; set; }*/
        public double Adeudada { get; set; }
        /*public List<VentaProducto> VentaProducto { get; set; }*/
        public virtual ClienteEntidad Cliente { get; set; }
        public virtual ICollection<VentaLine> VentaLines { get; set; }
        public virtual ICollection<VentaOrder> ? VentaOrders { get; set; }

    }
}
