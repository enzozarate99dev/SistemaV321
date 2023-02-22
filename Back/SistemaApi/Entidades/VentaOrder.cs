using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class VentaOrder
    {
        [Key]
        public int Id_venta_order { get; set; }
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public string TipoComprobante { get; set; }
        public virtual Venta Venta { get; set; }  
        public ICollection<VentaOrderPago> Venta_Order_Pagos { get; set; }

    }
}
