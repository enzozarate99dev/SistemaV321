namespace SistemaApi.Entidades
{
    public class VentaOrderPago
    {
        public int PagoId { get; set; }
        public int VentaOrderId { get; set; }
        public virtual VentaOrder VentaOrder { get; set; }
        public virtual Pago Pago { get; set; }

    }
}
