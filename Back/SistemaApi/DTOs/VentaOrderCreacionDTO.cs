namespace SistemaApi.DTOs
{
    public class VentaOrderCreacionDTO
    {
        public int Id_venta { get; set; }
        public DateTime Fecha { get; set; }
        public string TipoComprobante { get; set; }
        public ICollection<VentaOrderPagosCreacionDTO> Venta_Order_Pagos { get; set; }
    }
}
