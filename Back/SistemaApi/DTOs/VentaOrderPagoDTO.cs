namespace SistemaApi.DTOs
{
    public class VentaOrderPagoDTO
    {
        public int PagoId { get; set; }
        public int Venta_orderId { get; set; }
        public ICollection<PagoCreacionDTO> Pagos { get; set; }
    }
}
