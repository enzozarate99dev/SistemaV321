using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class VentaOrder
    {
        [Key]
        public int Id_VentaOrder { get; set; }
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public double Importe { get; set; }
        public int MetodoDePago { get; set; }
        public string TipoComprobante { get; set; }
        public virtual Venta Venta { get; set; }
       /* public ICollection<VentaOrder> VentaOrdersMadres { get; set; }
        public ICollection<VentaOrder> VentaOrdersHijas { get; set; }*/

         public ICollection<Pago> Pagos { get; set; }
    }
}
