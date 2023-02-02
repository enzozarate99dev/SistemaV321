namespace SistemaApi.DTOs
{
    public class VentaLineDTO
    {
        public int VentaLineId { get; set; }
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public double Total { get; set; }
        public double PrecioUnitario { get; set; }
        public double Cantidad { get; set; }
        public double PrecioUnitarioViejo { get; set; }
    }
}
