namespace SistemaApi.DTOs
{
    public class PagosCreacionDTO
    {
        public double PrecioTotal { get; set; }
        public DateTime FechaDePago { get; set; }
        public List<MetodosDePagoCreacionDTO> MetodosDePago { get; set; }
    }
}
