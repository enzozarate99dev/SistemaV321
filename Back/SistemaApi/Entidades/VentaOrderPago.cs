namespace SistemaApi.Entidades
{
    public class VentaOrderPago
    {
        public int PagoId { get; set; }
        public int Venta_orderId { get; set; } 
        public virtual Pagos Pago { get; set; }
        public virtual VentaOrder Venta_Order { get; set; }
    }
}
