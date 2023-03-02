namespace SistemaApi.DTOs
{
    public class VentaOrderDTO
    {
        public int Id_VentaOrder { get; set; }
        public int VentaId { get; set; }
        public DateTime Fecha { get; set; }
        public double Importe { get; set; }
        public List<PagoDTO> Pagos { get; set; }
    }
}
