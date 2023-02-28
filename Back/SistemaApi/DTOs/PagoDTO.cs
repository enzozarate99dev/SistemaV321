namespace SistemaApi.DTOs
{
    public class PagoDTO
    {
        public int Id_pago { get; set; }
        public double PrecioTotal { get; set; }
        public DateTime FechaDePago { get; set; }
        public string MetodoDePago { get; set; }
    }
}
