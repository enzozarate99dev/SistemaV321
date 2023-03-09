namespace SistemaApi.Entidades
{
    public class VentaPago
    {
        public int VentaId { get; set; }
        public int PagoId { get; set; }
        
        public Venta Venta { get; set; }
        public Pago Pago { get; set; }
    }
}
