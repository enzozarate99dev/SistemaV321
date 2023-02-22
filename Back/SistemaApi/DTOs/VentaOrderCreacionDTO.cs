namespace SistemaApi.DTOs
{
    public class VentaOrderCreacionDTO
    {
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public string TipoComprobante { get; set; }
        public ICollection<VentaOrderPagosCreacionDTO> VentaOrderPagos { get; set; }
    }
}
