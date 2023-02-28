namespace SistemaApi.DTOs
{
    public class VentaOrderDTO
    {
        public int Id_VentaOrder { get; set; }
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public string TipoComprobante { get; set; }
        public List<VentaOrderPagoDTO> VentaOrderPagos { get; set; }
    }
}
