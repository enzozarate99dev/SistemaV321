using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class VentaOrder
    {
        [Key]
        public int Id_VentaOrder { get; set; }
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public string TipoComprobante { get; set; }
        public virtual Venta Venta { get; set; }
        public List<VentaOrderPago> VentaOrderPagos { get; set; }
    }
}
