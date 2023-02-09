using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class VentaOrderDTO
    {
        public int Id_venta_order { get; set; }
        public int Id_venta { get; set; }
        public DateTime Fecha { get; set; }
        public string TipoComprobante { get; set; }
        public ICollection<VentaOrdePagosDTO> Venta_Order_Pagos { get; set; }
    }
}
