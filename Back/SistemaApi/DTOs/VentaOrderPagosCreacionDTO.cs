namespace SistemaApi.DTOs
{
    public class VentaOrderPagosCreacionDTO
    {
        public int PagoId { get; set; }
        public int Venta_orderId { get; set; }
        public ICollection<PagosCreacionDTO> Pago { get; set; }
    }
}
