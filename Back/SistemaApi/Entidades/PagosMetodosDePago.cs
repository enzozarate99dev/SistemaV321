namespace SistemaApi.Entidades
{
    public class PagosMetodosDePago
    {
        public int MetodoId { get; set; }
        public int PagoId { get; set; }
        public MetodoDePago MetodoDePago { get; set; }
        public Pago Pago { get; set; }
    }
}
